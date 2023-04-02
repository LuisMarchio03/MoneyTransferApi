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
	db, err := sql.Open("sqlite3", "./transfer.db")
	if err != nil {
		panic(err)
	}
	defer db.Close()

	// _, err = db.Exec("CREATE TABLE users (id varchar(255) NOT NULL, name varchar(255) NOT NULL, email varchar(255) NOT NULL, password varchar(255), balance float NOT NULL, cpfCnpj varchar(255) NOT NULL, type varchar(255) NOT NULL, PRIMARY KEY (id))")
	// if err != nil {
	// 	panic(err)
	// }

	repository := implementation.NewUserRepository(db)
	transactionRepository := implementation.NewTransactionRepository(db)
	usecase := uc.NewSaveUserUsecase(*repository)
	transactionUsecase := uc.NewTransferMoneyUsecase(*transactionRepository)

	ch, err := rabbitmq.OpenChannel()
	if err != nil {
		panic(err)
	}
	defer ch.Close()

	out := make(chan amqp.Delivery)
	go rabbitmq.Consumer(ch, out, "users")

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

	handlers := web.NewTransactionHandlers(transactionUsecase)

	r := chi.NewRouter()
	r.Post("/transaction", handlers.TransferMoneyHandler)

	http.ListenAndServe(":4001", r)
}
