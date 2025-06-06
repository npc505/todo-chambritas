package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/npc505/backend/auth"
	"github.com/npc505/backend/models"
	"github.com/npc505/backend/server"
	"golang.org/x/crypto/bcrypt"
)

const (
	HASH_COST = 8
)

type SignUpRequest struct {
	Nombre          string `json:"nombre"`
	ApellidoPaterno string `json:"apellido_paterno"`
	Correo          string `json:"correo"`
	Contrasena      string `json:"contrasena"`
	Celular         string `json:"celular"`
}

type LoginRequest struct {
	Correo     string `json:"correo"`
	Contrasena string `json:"contrasena"`
}

type SignUpResponse struct {
	Id    uint64 `json:"id"`
	Email string `json:"email"`
}

type LoginResponse struct {
	Token string `json:"token"`
}

func SignUpHandler(s server.Server) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var request = SignUpRequest{}
		err := json.NewDecoder(r.Body).Decode(&request)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(request.Contrasena), HASH_COST)

		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		user := models.User{
			Nombre:          request.Nombre,
			ApellidoPaterno: request.ApellidoPaterno,
			Correo:          request.Correo,
			Contrasena:      string(hashedPassword),
			Celular:         request.Celular,
		}

		id, err := s.UserRepo().InsertUser(r.Context(), &user)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(SignUpResponse{
			Id:    id,
			Email: user.Correo,
		})
	}

}

func LoginHandler(s server.Server) http.HandlerFunc {

	return func(w http.ResponseWriter, r *http.Request) {
		var request = LoginRequest{}
		err := json.NewDecoder(r.Body).Decode(&request)

		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
		}

		user, err := s.UserRepo().GetUserByEmail(r.Context(), request.Correo)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		if user == nil {
			http.Error(w, "Invalid credentials", http.StatusUnauthorized) //Para cuestiones de seguridad, no dar info de si existe o no tal usuario
			return
		}

		if err := bcrypt.CompareHashAndPassword([]byte(user.Contrasena), []byte(request.Contrasena)); err != nil {
			http.Error(w, "Invalid credentials", http.StatusUnauthorized) //Para cuestiones de seguridad, no dar info de si existe o no tal usuario
			return
		}

		tokenString, err := auth.GenerateJWT(user.ID, s.Config().JWTSecret)
		if err != nil {
			http.Error(w, "Failed to sign token", http.StatusInternalServerError)
			return
		}

		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(LoginResponse{
			Token: tokenString,
		})

	}

}

// Debug
func MeHandler(s server.Server) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		claims, ok := r.Context().Value("userClaims").(*models.AppClaims)
		if !ok || claims == nil {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}

		user, err := s.UserRepo().GetUserById(r.Context(), claims.UserId)
		if err != nil {
			http.Error(w, err.Error(), http.StatusUnauthorized)
			return
		}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(user)
	}
}
