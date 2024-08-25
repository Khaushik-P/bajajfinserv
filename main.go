package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"regexp"
	"strings"
)

type Request struct {
	Data []string `json:"data"`
}

type Response struct {
	IsSuccess                bool     `json:"is_success"`
	UserID                   string   `json:"user_id"`
	Email                    string   `json:"email"`
	RollNumber               string   `json:"roll_number"`
	Numbers                  []string `json:"numbers"`
	Alphabets                []string `json:"alphabets"`
	HighestLowercaseAlphabet []string `json:"highest_lowercase_alphabet"`
}

func bfhlHandler(w http.ResponseWriter, r *http.Request) {
	// CORS headers
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	switch r.Method {
	case http.MethodPost:
		var req Request
		err := json.NewDecoder(r.Body).Decode(&req)
		if err != nil {
			http.Error(w, "Invalid input", http.StatusBadRequest)
			return
		}

		numbers := []string{}
		alphabets := []string{}
		highestLowercase := ""

		numberRegex := regexp.MustCompile(`^[0-9]+$`)
		alphabetRegex := regexp.MustCompile(`^[a-zA-Z]$`)

		for _, item := range req.Data {
			if numberRegex.MatchString(item) {
				numbers = append(numbers, item)
			} else if alphabetRegex.MatchString(item) {
				alphabets = append(alphabets, item)
				lowercaseItem := strings.ToLower(item)
				if lowercaseItem > highestLowercase {
					highestLowercase = lowercaseItem
				}
			}
		}

		response := Response{
			IsSuccess:                true,
			UserID:                   "Khaushik_P_1402004",
			Email:                    "khaushik.p2021@vitstudent.ac.in",
			RollNumber:               "21BPS1537",
			Numbers:                  numbers,
			Alphabets:                alphabets,
			HighestLowercaseAlphabet: []string{highestLowercase},
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(response)

	case http.MethodGet:
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(map[string]int{"operation_code": 1})

	case http.MethodOptions:
		w.WriteHeader(http.StatusOK)

	default:
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
	}
}

func main() {
	http.HandleFunc("/bfhl", bfhlHandler)
	fmt.Println("Server is running on port 8082...")
	http.ListenAndServe(":8082", nil)
}
