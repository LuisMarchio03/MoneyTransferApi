package entities

import (
	"errors"
)

type Transaction struct {
	ID         string  `json:"id"`
	Value      float64 `json:"value"`
	Payer      int     `json:"payer"`
	Payee      int     `json:"payee"`
	IsCanceled bool    `json:"isCanceled"`
}

func NewTransaction(id string, value float64, payer int, payee int, isCanceled bool) *Transaction {
	return &Transaction{
		ID:         id,
		Value:      value,
		Payer:      payer,
		Payee:      payee,
		IsCanceled: isCanceled,
	}
}

func (t *Transaction) isValid() error {
	if t.ID == "" {
		return errors.New("id is required")
	}
	if t.Value <= 0 {
		return errors.New("value must be greater than zero")
	}
	if t.Payer == 0 {
		return errors.New("payer is required")
	}
	if t.Payee == 0 {
		return errors.New("payee is required")
	}
	if t.Payer == t.Payee {
		return errors.New("payer and payee must be different")
	}
	return nil
}
