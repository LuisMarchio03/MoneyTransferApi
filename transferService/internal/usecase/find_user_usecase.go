package usecase

import (
	"github.com/luismarchio/transaction-api/internal/entities"
	"github.com/luismarchio/transaction-api/internal/infra/repositories"
	implementation "github.com/luismarchio/transaction-api/internal/infra/repositories/implementation"
)

type FindUserUsecase struct {
	UserRepository repositories.UserRepositoryInterface
}

func NewFindUserUsecase(
	repository implementation.UserRepository,
) *FindUserUsecase {
	return &FindUserUsecase{
		UserRepository: &repository,
	}
}

func (u *FindUserUsecase) Execute(id string) (*entities.User, error) {
	user, err := u.UserRepository.FindUserById(id)
	if err != nil {
		return nil, err
	}
	return user, nil
}
