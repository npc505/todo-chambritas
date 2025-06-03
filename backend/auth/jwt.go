package auth

import (
	"time"

	"github.com/golang-jwt/jwt"
	"github.com/npc505/backend/models"
)

const (
	HORAS = 72
)

func GenerateJWT(userID uint64, jwtSecret string) (string, error) {
	claims := models.AppClaims{
		UserId: userID,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(HORAS * time.Hour).Unix(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(jwtSecret))
}
