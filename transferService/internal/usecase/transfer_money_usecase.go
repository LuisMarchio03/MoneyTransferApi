package usecase

import (
	"errors"

	"github.com/luismarchio/transaction-api/internal/infra/repositories"
	implementation "github.com/luismarchio/transaction-api/internal/infra/repositories/implementation"
)

type MockUser struct {
	ID       string
	Name     string
	Email    string
	Password string
	Balance  float64
	Cpf_Cnpj int64
	Type     string
}

type TransferMoneyUsecase struct {
	TransactionRepository repositories.TransactionRepositoryInterface
}

func NewTransferMoneyUsecase(
	repository implementation.TransactionRepository,
) *TransferMoneyUsecase {
	return &TransferMoneyUsecase{
		TransactionRepository: &repository,
	}
}

func (u *TransferMoneyUsecase) Execute(
	sender *MockUser,
	receiver *MockUser,
	value float64,
) error {
	// Validar Regras de Negocio
	if sender.Type == "shopkeeper" {
		return errors.New("Shopkeepers cannot perform a transaction.")
	}

	if sender.Balance < value {
		return errors.New("Insufficient balance to make this transfer.")
	}

	err := u.TransactionRepository.TransferMoney(
		sender.ID,
		receiver.ID,
		value,
	)
	if err != nil {
		return err
	}

	return nil
}
