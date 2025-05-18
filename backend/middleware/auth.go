package middleware

import (
	"context"
	"net/http"
	"strings"

	"github.com/golang-jwt/jwt"
	"github.com/npc505/backend/models"
	"github.com/npc505/backend/server"
)

var (
	NO_AUTH_NEEDED = []string{
		"login",
		"signup",
	}
)

func shouldCheckToken(route string) bool {
	for _, p := range NO_AUTH_NEEDED {
		if strings.Contains(route, p) {
			return false
		}
	}

	return true
}

func CheckAuthMiddleware(s server.Server) func(h http.Handler) http.Handler { //devuelve al guardia

	return func(next http.Handler) http.Handler { //Un guardia recibe la función http que podría devolver o no. recibe a quien debe proteger.

		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) { //es la lógica del guardia

			if !shouldCheckToken(r.URL.Path) {
				next.ServeHTTP(w, r)
				return
			}
			tokenString := strings.TrimSpace(r.Header.Get("Authorization"))
			claims := &models.AppClaims{}
			_, err := jwt.ParseWithClaims(tokenString, claims, func(t *jwt.Token) (interface{}, error) {
				return []byte(s.Config().JWTSecret), nil
			})

			if err != nil {
				http.Error(w, err.Error(), http.StatusUnauthorized)
				return
			}

			ctx := context.WithValue(r.Context(), "userClaims", claims)
			next.ServeHTTP(w, r.WithContext(ctx))
		})

	}
}
