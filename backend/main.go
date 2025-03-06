package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/joho/godotenv"
)

const (
	BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=%s"
	ENV_FILE = ".env"
	PORT     = "8080"
)

var (
	Key    string
	Url    string
	Client *http.Client
)

func main() {
	err := godotenv.Load(ENV_FILE)
	if err != nil {
		log.Fatal(err)
	}
	Key = os.Getenv("API_KEY")
	Url = fmt.Sprintf(BASE_URL, Key)
	Client = &http.Client{Timeout: 120 * time.Second}

	http.HandleFunc("/ask/", AskHandler)
	fmt.Println("Http server running and listening on port", PORT)
	if err := http.ListenAndServe(":"+PORT, nil); err != nil {
		log.Fatal(err)
	}
}
