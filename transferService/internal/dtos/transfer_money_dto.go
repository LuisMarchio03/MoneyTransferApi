package dtos

type TransferMoneyDTO struct {
	ID    string
	Value float64
	Payer string
	Payee string
}
