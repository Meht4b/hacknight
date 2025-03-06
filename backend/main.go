package main

import (
	"bufio"
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"os/exec"
	"strings"
	"time"

	"github.com/joho/godotenv"
)

const (
	BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=%s"
	ENV_FILE = ".env"
)

//
// type Core struct {
// 	Parts []map[string]string
// 	// Role  string
// }

// type Inner struct {
// 	Content      map[string][]map[string]string
// 	FinishReason any
// 	AvgLogprobs  any
// }
//
// type Data struct {
// 	Candidates              []Inner
// 	UsageMetadata           any
// 	CandidatesTokensDetails any
// 	ModelVersion            any
// }

func main() {
	err := godotenv.Load(ENV_FILE)
	if err != nil {
		log.Fatal(err)
	}
	key := os.Getenv("API_KEY")
	url := fmt.Sprintf(BASE_URL, key)
	client := &http.Client{Timeout: 120 * time.Second}
	s := bufio.NewScanner(os.Stdin)
	fmt.Printf("Enter prompt: ")
	s.Scan()
	prompt := s.Text()
	resp, err := client.Post(url, "application/json", strings.NewReader(fmt.Sprintf(`{
  "contents": [{
    "parts":[{"text": "%s"}]
    }]
   }`, prompt)))
	if err != nil {
		log.Fatal(err)
	}
	defer resp.Body.Close()
	b, err := io.ReadAll(resp.Body)
	if err != nil {
		log.Fatal(err)
	}
	var dst bytes.Buffer
	if err = json.Compact(&dst, b); err != nil {
		log.Fatal(err)
	}
	cmd := fmt.Sprintf(`print(%s["candidates"][0]["content"]["parts"][0]["text"])`, dst.String())
	out, err := exec.Command("python3", "-c", cmd).Output()
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(string(out))
}
