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
	FindUserUsecase            *usecase.FindUserUsecase
}

func NewTransactionHandlers(
	transferMoneyUsecase *usecase.TransferMoneyUsecase,
	cancelTransferMoneyUsecase *usecase.CancelTransferMoneyUsecase,
	findUserUsecase *usecase.FindUserUsecase,
) *TransactionHandlers {
	return &TransactionHandlers{
		TransferMoneyUsecase:       transferMoneyUsecase,
		CancelTransferMoneyUsecase: cancelTransferMoneyUsecase,
		FindUserUsecase:            findUserUsecase,
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

	// find user by id
	sender, err := h.FindUserUsecase.Execute(input.Payer)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(err.Error()))
		return
	}

	// find user by id
	receiver, err := h.FindUserUsecase.Execute(input.Payee)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(err.Error()))
		return
	}

	value := input.Value

	err = h.TransferMoneyUsecase.Execute(
		sender,
		receiver,
		value,
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

	// find user by id
	sender, err := h.FindUserUsecase.Execute(input.Payer)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(err.Error()))
		return
	}

	// find user by id
	receiver, err := h.FindUserUsecase.Execute(input.Payee)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(err.Error()))
		return
	}

	value := input.Value

	err = h.CancelTransferMoneyUsecase.Execute(
		sender,
		receiver,
		value,
	)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(err.Error()))
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Cancel transfer successful"))
}
