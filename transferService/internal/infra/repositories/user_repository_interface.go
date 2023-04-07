package repositories

import (
	"github.com/luismarchio/transaction-api/internal/entities"
)

type UserRepositoryInterface interface {
	Save(user *entities.User) error
	FindUserById(id string) (*entities.User, error)
}
