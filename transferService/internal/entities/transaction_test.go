package entities

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestIsValidIdIsRequired(t *testing.T) {
	transaction := NewTransaction("", 1, 1, 2)
	err := transaction.isValid()
	assert.Equal(t, "id is required", err.Error())
}

func TestIsValidValueMustBeGreaterThanZero(t *testing.T) {
	transaction := NewTransaction("123", 0, 1, 2)
	err := transaction.isValid()
	assert.Equal(t, "value must be greater than zero", err.Error())
}

func TestIsValidPayerIsRequired(t *testing.T) {
	transaction := NewTransaction("123", 1, 0, 2)
	err := transaction.isValid()
	assert.Equal(t, "payer is required", err.Error())
}

func TestIsValidPayeeIsRequired(t *testing.T) {
	transaction := NewTransaction("123", 1, 1, 0)
	err := transaction.isValid()
	assert.Equal(t, "payee is required", err.Error())
}

func TestIsValidPayerAndPayeeMustBeDifferent(t *testing.T) {
	transaction := NewTransaction("123", 1, 1, 1)
	err := transaction.isValid()
	assert.Equal(t, "payer and payee must be different", err.Error())
}
