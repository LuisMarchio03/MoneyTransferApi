package usecase

import (
	"database/sql"
	"testing"

	"github.com/luismarchio/transaction-api/internal/entities"
	implementation "github.com/luismarchio/transaction-api/internal/infra/repositories/implementation"
	_ "github.com/mattn/go-sqlite3"
	"github.com/stretchr/testify/suite"
)

type TransferMoneyUsecaseTestSuite struct {
	suite.Suite
	respository implementation.TransactionRepository
	Db          *sql.DB
}

func (suite *TransferMoneyUsecaseTestSuite) SetupSuite() {
	db, err := sql.Open("sqlite3", ":memory:")
	suite.NoError(err)
	db.Exec("CREATE TABLE users (id varchar(255) NOT NULL, name varchar(255) NOT NULL, email varchar(255) NOT NULL, password varchar(255), balance float NOT NULL, cpfCnpj varchar(255) NOT NULL, type varchar(255) NOT NULL, PRIMARY KEY (id), UNIQUE (email), UNIQUE (cpfCnpj))")
	db.Exec("CREATE TABLE transactions (id varchar(255) NOT NULL, value float NOT NULL, payer varchar(255) NOT NULL, payee varchar(255) NOT NULL, isCanceled boolean NOT NULL, PRIMARY KEY (id))")
	suite.Db = db
	suite.respository = *implementation.NewTransactionRepository(db)
}

func (suite *TransferMoneyUsecaseTestSuite) TearDownSuite() {
	suite.Db.Close()
}

func TestTransferMoneyUsecaseTestSuite(t *testing.T) {
	suite.Run(t, new(TransferMoneyUsecaseTestSuite))
}

func (suite *TransferMoneyUsecaseTestSuite) TestTransferMoneyUsecaseSuccess() {
	sender := &entities.User{
		ID:      "123",
		Name:    "senderName",
		Email:   "senderEmail@email.com",
		Balance: 1000,
		CpfCnpj: "123456789",
		Type:    "common",
	}

	receiver := &entities.User{
		ID:      "456",
		Name:    "receiverName",
		Email:   "receiverEmail@email.com",
		Balance: 100,
		CpfCnpj: "123456789",
		Type:    "shopkeeper",
	}

	mockValue := 200.0

	err := NewTransferMoneyUsecase(suite.respository).Execute(
		sender,
		receiver,
		mockValue,
	)
	suite.NoError(err)
}

func (suite *TransferMoneyUsecaseTestSuite) TestTransferMoneyUsecaseErrorShopkeepersCannotPerformATransaction() {
	respository := implementation.TransactionRepository{Db: suite.Db}

	sender := &entities.User{
		ID:      "678",
		Name:    "senderName",
		Email:   "senderEmail@email.com",
		Balance: 1000,
		CpfCnpj: "123456789",
		Type:    "shopkeeper",
	}

	receiver := &entities.User{
		ID:      "910",
		Name:    "receiverName",
		Email:   "receiverEmail@email.com",
		Balance: 100,
		CpfCnpj: "123456789",
		Type:    "common",
	}

	mockValue := 200.0

	err := NewTransferMoneyUsecase(respository).Execute(
		sender,
		receiver,
		mockValue,
	)
	suite.Error(err)
}

func (suite *TransferMoneyUsecaseTestSuite) TestTransferMoneyUsecaseErrorInsufficientBalanceToMakeThisTransfer() {
	respository := implementation.TransactionRepository{Db: suite.Db}

	sender := &entities.User{
		ID:      "1011",
		Name:    "senderName",
		Email:   "senderEmail@email.com",
		Balance: 1000,
		CpfCnpj: "123456789",
		Type:    "common",
	}

	receiver := &entities.User{
		ID:      "1112",
		Name:    "receiverName",
		Email:   "receiverEmail@email.com",
		Balance: 100,
		CpfCnpj: "123456789",
		Type:    "shopkeeper",
	}

	mockValue := 2000.0

	err := NewTransferMoneyUsecase(respository).Execute(
		sender,
		receiver,
		mockValue,
	)
	suite.Error(err)
}
