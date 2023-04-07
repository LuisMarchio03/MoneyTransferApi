package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/luismarchio/transaction-api/internal/dtos"
	"github.com/luismarchio/transaction-api/internal/entities"
	implementation "github.com/luismarchio/transaction-api/internal/infra/repositories/implementation"
	uc "github.com/luismarchio/transaction-api/internal/usecase"
	"github.com/luismarchio/transaction-api/pkg/rabbitmq"
	_ "github.com/mattn/go-sqlite3"

	"github.com/luismarchio/transaction-api/internal/infra/web"

	amqp "github.com/rabbitmq/amqp091-go"
)

func main() {
	// open db
	db, err := sql.Open("sqlite3", "./transfer.db")
	if err != nil {
		panic(err)
	}
	defer db.Close()

	// create table if not exists
	sqlStmt := `
	create table if not exists users (id varchar(255) NOT NULL, name varchar(255) NOT NULL, email varchar(255) NOT NULL, password varchar(255), balance float NOT NULL, cpfCnpj varchar(255) NOT NULL, type varchar(255) NOT NULL, PRIMARY KEY (id), UNIQUE (email), UNIQUE (cpfCnpj));
	delete from users;
	`
	_, err = db.Exec(sqlStmt)
	if err != nil {
		panic(err)
	}

	sqlStmt = `
	create table if not exists transactions (id varchar(255) NOT NULL, value float NOT NULL, payer varchar(255) NOT NULL, payee varchar(255) NOT NULL, isCanceled boolean NOT NULL, PRIMARY KEY (id));	
	delete from transactions;
	`
	_, err = db.Exec(sqlStmt)
	if err != nil {
		panic(err)
	}

	// create router
	repository := implementation.NewUserRepository(db)
	transactionRepository := implementation.NewTransactionRepository(db)
	usecase := uc.NewSaveUserUsecase(*repository)
	transactionUsecase := uc.NewTransferMoneyUsecase(*transactionRepository)
	cancelTransferMoneyUsecase := uc.NewCancelTransferMoneyUsecase(*transactionRepository)

	// create channel
	ch, err := rabbitmq.OpenChannel()
	if err != nil {
		panic(err)
	}
	defer ch.Close()

	// create queue
	out := make(chan amqp.Delivery)
	go rabbitmq.Consumer(ch, out, "users")

	// create workers
	for i := 1; i <= 10; i++ {
		go func() {
			for {
				msg := <-out
				var user dtos.UserDTO
				err := json.Unmarshal(msg.Body, &user)
				fmt.Println(&user)
				if err != nil {
					panic(err)
				}
				err = usecase.Execute(&entities.User{
					ID:      user.ID,
					Name:    user.Name,
					Email:   user.Email,
					Balance: user.Balance,
					CpfCnpj: user.CpfCnpj,
					Type:    user.Type,
				})
				if err != nil {
					panic(err)
				}
				msg.Ack(false)
				fmt.Println("User saved")
			}
		}()
	}

	// create handlers
	handlers := web.NewTransactionHandlers(
		transactionUsecase,
		cancelTransferMoneyUsecase,
	)

	// create router
	r := chi.NewRouter()
	r.Post("/transaction", handlers.TransferMoneyHandler)
	r.Post("/transaction/cancel", handlers.CancelTransferMoneyHandler)

	// start server
	http.ListenAndServe(":4001", r)
}
