package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/npc505/backend/server"
)

type HomeResponse struct {
	Message string `json:"message"`
	Status  bool   `json:"status"`
}

func HomeHanlder(s server.Server) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		response := HomeResponse{
			Message: "Welcome to the API",
			Status:  true,
		}
		json.NewEncoder(w).Encode(response)
	}
}
