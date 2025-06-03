package auth

import (
	"context"
	"fmt"

	"google.golang.org/api/idtoken"
)

type GoogleProvider struct {
	ClientID string
}

func NewGoogleProvider(clientID string) *GoogleProvider {
	return &GoogleProvider{ClientID: clientID}
}

func (g *GoogleProvider) ValidateToken(ctx context.Context, idToken string) (*AuthUser, error) {

	fmt.Println("idToken:", idToken)
	fmt.Println("----------------------")
	fmt.Println("Client ID:", g.ClientID)
	payload, err := idtoken.Validate(ctx, idToken, g.ClientID)
	if err != nil {
		fmt.Println("err:", err)
		return nil, fmt.Errorf("token inválido: %w", err)
	}

	email, _ := payload.Claims["email"].(string)
	firstName, _ := payload.Claims["given_name"].(string)
	lastName, _ := payload.Claims["family_name"].(string)

	return &AuthUser{
		Email:     email,
		FirstName: firstName,
		LastName:  lastName,
		Provider:  "google",
	}, nil
}
