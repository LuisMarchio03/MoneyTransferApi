package repositories

import (
	"database/sql"

	"github.com/google/uuid"
)

type TransactionRepository struct {
	Db *sql.DB
}

func NewTransactionRepository(db *sql.DB) *TransactionRepository {
	return &TransactionRepository{Db: db}
}

func (r *TransactionRepository) TransferMoney(
	senderID string,
	receiverID string,
	value float64,
) error {
	// Retirar o dinheiro da carteiro do mockUserSender
	stmt, err := r.Db.Prepare("UPDATE users SET balance = balance - ? WHERE id = ?")
	if err != nil {
		return err
	}
	defer stmt.Close()

	_, err = stmt.Exec(value, senderID)
	if err != nil {
		return err
	}

	// Acrescentar o dinheiro na carteira do mockUserReceiver
	stmt, err = r.Db.Prepare("UPDATE users SET balance = balance + ? WHERE id = ?")
	if err != nil {
		return err
	}
	defer stmt.Close()

	_, err = stmt.Exec(value, receiverID)
	if err != nil {
		return err
	}

	// Criar um transaction (historico)
	stmt, err = r.Db.Prepare("INSERT INTO transactions (id, value, payer, payee, isCanceled) VALUES (?, ?, ?, ?, ?)")
	if err != nil {
		return err
	}
	defer stmt.Close()

	_, err = stmt.Exec(
		uuid.New().String(),
		value,
		senderID,
		receiverID,
		false,
	)
	if err != nil {
		return err
	}

	return nil
}

func (r *TransactionRepository) CancelTransferMoney(
	senderID string,
	receiverID string,
	value float64,
) error {
	// Retirar o dinheiro da carteiro do mockUserSender
	stmt, err := r.Db.Prepare("UPDATE users SET balance = balance + ? WHERE id = ?")
	if err != nil {
		return err
	}
	defer stmt.Close()

	_, err = stmt.Exec(value, senderID)
	if err != nil {
		return err
	}

	// Acrescentar o dinheiro na carteira do mockUserReceiver
	stmt, err = r.Db.Prepare("UPDATE users SET balance = balance - ? WHERE id = ?")
	if err != nil {
		return err
	}
	defer stmt.Close()

	_, err = stmt.Exec(value, receiverID)
	if err != nil {
		return err
	}

	// Atualizar o transaction (historico)
	stmt, err = r.Db.Prepare("UPDATE transactions SET isCanceled = true WHERE payer = ? AND payee = ? AND value = ?")
	if err != nil {
		return err
	}
	defer stmt.Close()

	_, err = stmt.Exec(senderID, receiverID, value)
	if err != nil {
		return err
	}

	return nil
}
