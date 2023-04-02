package repositories

type TransactionRepositoryInterface interface {
	TransferMoney(senderID string, receiverID string, value float64) error
	CancelTransferMoney(senderID string, receiverID string, value float64) error
}
