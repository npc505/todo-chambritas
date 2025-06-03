package auth

import (
	"context"
)

type AuthUser struct {
	Email     string
	FirstName string
	LastName  string
	Provider  string
}

type AuthProvider interface {
	ValidateToken(ctx context.Context, idToken string) (*AuthUser, error)
}
