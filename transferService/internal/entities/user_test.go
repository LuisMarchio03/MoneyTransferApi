package entities

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestUserIsValidIdIsRequired(t *testing.T) {
	user := NewUser(
		"",
		"John Doe",
		"john@mail.com",
		1000,
		"12345678901",
		"common",
	)
	err := user.isValid()
	assert.Equal(t, "id is required", err.Error())
}

func TestUserIsValidNameIsRequired(t *testing.T) {
	user := NewUser(
		"123",
		"",
		"john2@mail.com",
		1000,
		"12345678902",
		"common",
	)
	err := user.isValid()
	assert.Equal(t, "name is required", err.Error())
}

func TestUserIsValidEmailIsRequired(t *testing.T) {
	user := NewUser(
		"1234",
		"John Doe 3",
		"",
		1000,
		"12345678903",
		"common",
	)
	err := user.isValid()
	assert.Equal(t, "email is required", err.Error())
}

func TestUserIsValidBalanceMustBeGreaterThanZero(t *testing.T) {
	user := NewUser(
		"12345",
		"John Doe 4",
		"john4@mail.com",
		-1,
		"12345678904",
		"common",
	)
	err := user.isValid()
	assert.Equal(t, "balance must be greater than zero", err.Error())
}

func TestUserIsValidCpfCnpjIsRequired(t *testing.T) {
	user := NewUser(
		"12345",
		"John Doe 4",
		"john4@mail.com",
		1023,
		"",
		"common",
	)
	err := user.isValid()
	assert.Equal(t, "cpfCnpj is required", err.Error())
}

func TestUserIsValidTypeIsRequired(t *testing.T) {
	user := NewUser(
		"12345",
		"John Doe 4",
		"john4@mail.com",
		2305,
		"12345678987",
		"",
	)
	err := user.isValid()
	assert.Equal(t, "type is required", err.Error())
}
