package auth

import (
	"errors"
	"fmt"
	"strings"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

// JWTManager contiene la clave secreta y métodos para crear y validar tokens
type JWTManager struct {
	secretKey     string
	tokenDuration time.Duration
}

// Nuevo JWTManager, pasa la clave secreta y duración del token
func NewJWTManager(secretKey string, tokenDuration time.Duration) *JWTManager {
	return &JWTManager{
		secretKey:     secretKey,
		tokenDuration: tokenDuration,
	}
}

// Crear un token para un usuario con ID (int64)
func (j *JWTManager) Generate(userID int64) (string, error) {
	claims := &jwt.RegisteredClaims{
		ExpiresAt: jwt.NewNumericDate(time.Now().Add(j.tokenDuration)),
		Issuer:    "mi-app",
		Subject:   fmt.Sprint(userID),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(j.secretKey))
}

// Validar el token y devolver los claims
func (j *JWTManager) Verify(accessToken string) (*jwt.RegisteredClaims, error) {
	token, err := jwt.ParseWithClaims(accessToken, &jwt.RegisteredClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(j.secretKey), nil
	})

	if err != nil {
		return nil, err
	}

	claims, ok := token.Claims.(*jwt.RegisteredClaims)
	if !ok || !token.Valid {
		return nil, errors.New("token inválido")
	}

	return claims, nil
}

// Extraer token JWT del header Authorization (formato: Bearer <token>)
func ExtractTokenFromHeader(header string) (string, error) {
	if header == "" {
		return "", errors.New("header Authorization vacío")
	}

	parts := strings.Split(header, " ")
	if len(parts) != 2 || parts[0] != "Bearer" {
		return "", errors.New("formato de header Authorization inválido")
	}

	return parts[1], nil
}
