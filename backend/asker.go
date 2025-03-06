package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os/exec"
	"strings"
)

func ask(prompt string) []byte {
	resp, err := Client.Post(Url, "application/json", strings.NewReader(fmt.Sprintf(`{
  "contents": [{
    "parts":[{"text": "%s"}]
    }]
   }`, prompt)))

	if err != nil {
		log.Println(err)
		return ask(prompt)
	}
	defer resp.Body.Close()
	b, err := io.ReadAll(resp.Body)
	if err != nil {
		log.Println(err)
	}
	var dst bytes.Buffer
	if err = json.Compact(&dst, b); err != nil {
		log.Println(err)
	}
	cmd := fmt.Sprintf(`print(%s["candidates"][0]["content"]["parts"][0]["text"])`, dst.String())
	out, err := exec.Command("python3", "-c", cmd).Output()
	if err != nil {
		fmt.Println(string(b))
		log.Println(err)
	}
	return out
}

func AskHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Recieved req")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "content-type, query")
	if r.Method == http.MethodOptions {
		w.Write([]byte("OKOK"))
		return
	}
	if r.Method != http.MethodGet {
		http.Error(w, "Invalid method :(", http.StatusMethodNotAllowed)
		return
	}
	query := r.Header.Get("query")
	w.Write(ask(query))
}
