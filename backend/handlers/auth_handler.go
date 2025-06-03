package handlers

import (
	"context"
	"crypto/rand"
	"database/sql"
	"encoding/base64"
	"encoding/json"
	"net/http"

	"github.com/npc505/backend/auth"
	"github.com/npc505/backend/models"
	"github.com/npc505/backend/server"
	"golang.org/x/crypto/bcrypt"
)

type GoogleLoginRequest struct {
	IDToken string `json:"id_token"`
}

func GenerateRandomPassword(length int) (string, error) {
	bytes := make([]byte, length)
	if _, err := rand.Read(bytes); err != nil {
		return "", err
	}
	return base64.RawURLEncoding.EncodeToString(bytes)[:length], nil
}

func GoogleLoginHandler(s server.Server) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req GoogleLoginRequest
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			http.Error(w, "JSON inválido", http.StatusBadRequest)
			return
		}

		authUser, err := s.AuthProvider().ValidateToken(context.Background(), req.IDToken)
		if err != nil {
			http.Error(w, "Token inválido", http.StatusUnauthorized)
			return
		}

		// Buscar usuario por correo
		user, err := s.UserRepo().GetUserByEmail(r.Context(), authUser.Email)
		if err != nil && err != sql.ErrNoRows {
			http.Error(w, "Error en base de datos", http.StatusInternalServerError)
			return
		}

		password, err := GenerateRandomPassword(16)
		if err != nil {
			http.Error(w, "Error generando usuario", http.StatusInternalServerError)
		}

		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), HASH_COST)

		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		// Si no existe, lo creamos
		if user == nil {
			newUser := &models.User{
				Nombre:          authUser.FirstName,
				ApellidoPaterno: authUser.LastName,
				Correo:          authUser.Email,
				Contrasena:      string(hashedPassword),
				Celular:         "",
			}
			_, err := s.UserRepo().InsertUser(r.Context(), newUser)
			if err != nil {
				http.Error(w, "Error creando usuario", http.StatusInternalServerError)
				return
			}
			user = newUser
		}

		// Generar JWT con el ID del usuario
		token, err := auth.GenerateJWT(user.ID, s.Config().JWTSecret)
		if err != nil {
			http.Error(w, "Error generando token", http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(LoginResponse{
			Token: token,
		})
	}
}
