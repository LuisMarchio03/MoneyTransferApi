package repositories

import (
	"database/sql"
	"testing"

	"github.com/luismarchio/transaction-api/internal/entities"
	_ "github.com/mattn/go-sqlite3"
	"github.com/stretchr/testify/suite"
)

type TransactionRepositoryTestSuite struct {
	suite.Suite
	Db *sql.DB
}

// SetupSuite is called once before the tests in the suite are run.
func (suite *TransactionRepositoryTestSuite) SetupSuite() {
	db, err := sql.Open("sqlite3", ":memory:")
	suite.NoError(err)
	db.Exec("CREATE TABLE users (id varchar(255) NOT NULL, name varchar(255) NOT NULL, email varchar(255) NOT NULL, password varchar(255), balance float NOT NULL, cpfCnpj varchar(255) NOT NULL, type varchar(255) NOT NULL, PRIMARY KEY (id), UNIQUE (email), UNIQUE (cpfCnpj))")
	db.Exec("CREATE TABLE transactions (id varchar(255) NOT NULL, value float NOT NULL, payer varchar(255) NOT NULL, payee varchar(255) NOT NULL, isCanceled boolean NOT NULL, PRIMARY KEY (id))")
	suite.Db = db
}

// TearDownSuite is called once after all tests in the suite have been run.
func (suite *TransactionRepositoryTestSuite) TearDownTest() {
	suite.Db.Close()
}

func TestSuite(t *testing.T) {
	suite.Run(t, new(TransactionRepositoryTestSuite))
}

func (suite *TransactionRepositoryTestSuite) TestTransfer() {
	suite.Run("Should transfer money", func() {
		mockUserSender := &entities.User{
			ID:      "123",
			Name:    "mock",
			Email:   "mock@email.com",
			Balance: 1200.0,
			CpfCnpj: "00000000000",
			Type:    "common",
		}

		mockUserReceiver := &entities.User{
			ID:      "456",
			Name:    "mockShopkeepers",
			Email:   "mockShopkeepers@email.com",
			Balance: 15000.0,
			CpfCnpj: "11111111111",
			Type:    "shopkeeper",
		}

		mockValue := 200.0

		repo := NewTransactionRepository(suite.Db)
		err := repo.TransferMoney(
			mockUserSender.ID,
			mockUserReceiver.ID,
			mockValue,
		)
		suite.NoError(err)
	})

	suite.Run("Should cancel transfer money", func() {
		mockUserSender := &entities.User{
			ID:      "123",
			Name:    "mock2",
			Email:   "mock2@mail.com",
			CpfCnpj: "00000000000",
			Balance: 1200.0,
			Type:    "common",
		}

		mockUserReceiver := &entities.User{
			ID:      "456",
			Name:    "mockShopkeepers2",
			Email:   "mockShopkeepers2@mail.com",
			CpfCnpj: "11111111111",
			Balance: 15000.0,
			Type:    "shopkeeper",
		}

		mockValue := 200.0

		repo := NewTransactionRepository(suite.Db)
		err := repo.CancelTransferMoney(
			mockUserSender.ID,
			mockUserReceiver.ID,
			mockValue,
		)
		suite.NoError(err)
	})
}
