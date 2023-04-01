package main

import (
	"database/sql"
)

func main() {
	db, err := sql.Open("sqlite3", "./db.db")
	if err != nil {
		panic(err)
	}
	defer db.Close()
}
