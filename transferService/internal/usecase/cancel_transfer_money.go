package usecase

import (
	"github.com/luismarchio/transaction-api/internal/entities"
	"github.com/luismarchio/transaction-api/internal/infra/repositories"
	implementation "github.com/luismarchio/transaction-api/internal/infra/repositories/implementation"
)

type CancelTransferMoneyUsecase struct {
	TransactionRepository repositories.TransactionRepositoryInterface
}

func NewCancelTransferMoneyUsecase(
	repository implementation.TransactionRepository,
) *CancelTransferMoneyUsecase {
	return &CancelTransferMoneyUsecase{
		TransactionRepository: &repository,
	}
}

func (u *CancelTransferMoneyUsecase) Execute(
	sender *entities.User,
	receiver *entities.User,
	value float64,
) error {
	err := u.TransactionRepository.CancelTransferMoney(
		sender.ID,
		receiver.ID,
		value,
	)
	if err != nil {
		return err
	}

	return nil
}
