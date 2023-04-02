package usecase

import (
	"github.com/luismarchio/transaction-api/internal/entities"
	"github.com/luismarchio/transaction-api/internal/infra/repositories"
	implementation "github.com/luismarchio/transaction-api/internal/infra/repositories/implementation"
)

type SaveUserUsecase struct {
	UserRepository repositories.UserRepositoryInterface
}

func NewSaveUserUsecase(
	repository implementation.UserRepository,
) *SaveUserUsecase {
	return &SaveUserUsecase{
		UserRepository: &repository,
	}
}

func (u *SaveUserUsecase) Execute(user *entities.User) error {
	err := u.UserRepository.Save(user)
	if err != nil {
		return err
	}

	return nil
}
