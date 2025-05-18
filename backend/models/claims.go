package models

import "github.com/golang-jwt/jwt"

type AppClaims struct {
	UserId uint64 `json:"userId"`
	jwt.StandardClaims
}
