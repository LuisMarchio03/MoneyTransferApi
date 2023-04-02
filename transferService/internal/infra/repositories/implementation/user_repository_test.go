package repositories

import (
	"database/sql"
	"testing"

	"github.com/luismarchio/transaction-api/internal/entities"
	_ "github.com/mattn/go-sqlite3"
	"github.com/stretchr/testify/suite"
)

type UserRepositoryTestSuite struct {
	suite.Suite
	Db *sql.DB
}

func (suite *UserRepositoryTestSuite) SetupSuite() {
	db, err := sql.Open("sqlite3", ":memory:")
	suite.NoError(err)
	db.Exec("CREATE TABLE users (id varchar(255) NOT NULL, name varchar(255) NOT NULL, email varchar(255) NOT NULL, password varchar(255), balance float NOT NULL, cpfCnpj varchar(255) NOT NULL, type varchar(255) NOT NULL, PRIMARY KEY (id), UNIQUE (email), UNIQUE (cpfCnpj))")
	suite.Db = db
}

func (suite *UserRepositoryTestSuite) TearDownTest() {
	suite.Db.Close()
}

func TestSuiteUser(t *testing.T) {
	suite.Run(t, new(UserRepositoryTestSuite))
}

func (suite *UserRepositoryTestSuite) TestSave() {
	userRepository := NewUserRepository(suite.Db)
	userRepository.Save(
		&entities.User{
			ID:      "123",
			Name:    "mock",
			Email:   "mock@mail.com",
			Balance: 1200.0,
			Type:    "common",
			CpfCnpj: "00000000000",
		},
	)
}
