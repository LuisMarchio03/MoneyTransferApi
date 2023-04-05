package web

import (
	"encoding/json"
	"net/http"

	"github.com/luismarchio/transaction-api/internal/dtos"
	usecase "github.com/luismarchio/transaction-api/internal/usecase"
)

type TransactionHandlers struct {
	TransferMoneyUsecase       *usecase.TransferMoneyUsecase
	CancelTransferMoneyUsecase *usecase.CancelTransferMoneyUsecase
}

func NewTransactionHandlers(
	transferMoneyUsecase *usecase.TransferMoneyUsecase,
	cancelTransferMoneyUsecase *usecase.CancelTransferMoneyUsecase,
) *TransactionHandlers {
	return &TransactionHandlers{
		TransferMoneyUsecase:       transferMoneyUsecase,
		CancelTransferMoneyUsecase: cancelTransferMoneyUsecase,
	}
}

func (h *TransactionHandlers) TransferMoneyHandler(w http.ResponseWriter, r *http.Request) {
	var input *dtos.TransferMoneyDTO
	err := json.NewDecoder(r.Body).Decode(&input)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(err.Error()))
		return
	}

	sender := &usecase.MockUser{
		ID:       "12334",
		Name:     "senderName3",
		Email:    "senderEmail3@email.com",
		Password: "senderPassword",
		Balance:  1000,
		CpfCnpj:  "123456733",
		Type:     "common",
	}

	receiver := &usecase.MockUser{
		ID:       "45676",
		Name:     "receiverName2",
		Email:    "receiverEmail2@email.com",
		Password: "receiverPassword",
		Balance:  100,
		CpfCnpj:  "123456722",
		Type:     "shopkeeper",
	}

	mockValue := 200.0

	err = h.TransferMoneyUsecase.Execute(
		sender,
		receiver,
		mockValue,
	)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(err.Error()))
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Transfer successful"))
}

func (h *TransactionHandlers) CancelTransferMoneyHandler(w http.ResponseWriter, r *http.Request) {
	var input *dtos.TransferMoneyDTO
	err := json.NewDecoder(r.Body).Decode(&input)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(err.Error()))
		return
	}

	sender := &usecase.MockUser{
		ID:       "12334",
		Name:     "senderName3",
		Email:    "senderEmail3@email.com",
		Password: "senderPassword",
		Balance:  1000,
		CpfCnpj:  "123456733",
		Type:     "common",
	}

	receiver := &usecase.MockUser{
		ID:       "45676",
		Name:     "receiverName2",
		Email:    "receiverEmail2@email.com",
		Password: "receiverPassword",
		Balance:  100,
		CpfCnpj:  "123456722",
		Type:     "shopkeeper",
	}

	mockValue := 200.0

	err = h.CancelTransferMoneyUsecase.Execute(
		sender,
		receiver,
		mockValue,
	)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(err.Error()))
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Cancel transfer successful"))
}
