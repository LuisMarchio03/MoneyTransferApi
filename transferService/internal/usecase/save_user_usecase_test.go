package usecase

import (
	"database/sql"
	"testing"

	"github.com/luismarchio/transaction-api/internal/entities"
	implementation "github.com/luismarchio/transaction-api/internal/infra/repositories/implementation"
	_ "github.com/mattn/go-sqlite3"
	"github.com/stretchr/testify/suite"
)

type SaveUserUsecaseTestSuite struct {
	suite.Suite
	respository implementation.UserRepository
	Db          *sql.DB
}

func (suite *SaveUserUsecaseTestSuite) SetupSuiteUser() {
	db, err := sql.Open("sqlite3", ":memory:")
	suite.NoError(err)
	db.Exec("CREATE TABLE users (id varchar(255) NOT NULL, name varchar(255) NOT NULL, email varchar(255) NOT NULL, password varchar(255) NOT NULL, balance float NOT NULL, cpfCnpj varchar(255) NOT NULL, type varchar(255) NOT NULL, PRIMARY KEY (id), UNIQUE (email), UNIQUE (cpfCnpj))")
	suite.Db = db
}

func (suite *SaveUserUsecaseTestSuite) TearDownSuiteUser() {
	suite.Db.Close()
}

func TestSaveUserUsecaseTestSuite(t *testing.T) {
	suite.Run(t, new(SaveUserUsecaseTestSuite))
}

func (suite *SaveUserUsecaseTestSuite) TestSaveUserUsecase() {
	suite.SetupSuiteUser()
	defer suite.TearDownSuiteUser()
	user := entities.User{
		ID:      "1",
		Name:    "Luis Marchio",
		Email:   "luis@mail.com",
		Balance: 100,
		CpfCnpj: "00000000000",
		Type:    "common",
	}
	userRepository := implementation.NewUserRepository(suite.Db)
	userRepository.Save(&user)
	suite.Equal(user.ID, "1")
}
