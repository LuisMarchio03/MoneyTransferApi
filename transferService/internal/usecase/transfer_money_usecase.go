package usecase

import (
	"errors"

	"github.com/luismarchio/transaction-api/internal/entities"
	"github.com/luismarchio/transaction-api/internal/infra/repositories"
	implementation "github.com/luismarchio/transaction-api/internal/infra/repositories/implementation"
)

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
	sender *entities.User,
	receiver *entities.User,
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
