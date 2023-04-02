package entities

import (
	"errors"
)

type User struct {
	ID      string  `json:"id"`
	Name    string  `json:"name"`
	Email   string  `json:"email"`
	Balance float64 `json:"balance"`
	CpfCnpj string  `json:"cpfCnpj"`
	Type    string  `json:"type"`
}

func NewUser(
	id string,
	name string,
	email string,
	balance float64,
	cpfCnpj string,
	_type string,

) *User {
	return &User{
		ID:      id,
		Name:    name,
		Email:   email,
		Balance: balance,
		CpfCnpj: cpfCnpj,
		Type:    _type,
	}
}

func (t *User) isValid() error {
	if t.ID == "" {
		return errors.New("id is required")
	}
	if t.Name == "" {
		return errors.New("name is required")
	}
	if t.Email == "" {
		return errors.New("email is required")
	}
	if t.Balance < 0 {
		return errors.New("balance must be greater than zero")
	}
	if t.CpfCnpj == "" {
		return errors.New("cpfCnpj is required")
	}
	if t.Type == "" {
		return errors.New("type is required")
	}
	return nil
}
