package repositories

import (
	"database/sql"

	"github.com/google/uuid"
	"github.com/luismarchio/transaction-api/internal/entities"
)

type UserRepository struct {
	Db *sql.DB
}

func NewUserRepository(db *sql.DB) *UserRepository {
	return &UserRepository{Db: db}
}

func (r *UserRepository) Save(user *entities.User) error {
	stmt, err := r.Db.Prepare("INSERT INTO users (id, name, balance, email, type, cpfCnpj) VALUES ($1, $2, $3, $4, $5, $6)")
	if err != nil {
		return err
	}
	defer stmt.Close()

	_, err = stmt.Exec(
		uuid.New().String(),
		user.Name,
		user.Balance,
		user.Email,
		user.Type,
		user.CpfCnpj,
	)
	if err != nil {
		return err
	}

	return nil
}

func (r *UserRepository) FindUserById(id string) (*entities.User, error) {
	var user entities.User
	stmt, err := r.Db.Prepare("SELECT * FROM users WHERE id = $1")
	if err != nil {
		return nil, err
	}
	defer stmt.Close()

	err = stmt.QueryRow(id).Scan(&user.ID, &user.Name, &user.Balance, &user.Email, &user.Type, &user.CpfCnpj)

	return &user, nil
}
