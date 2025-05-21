package repository

import (
	"context"

	"github.com/npc505/backend/models"
)

type UserRepository interface {
	InsertUser(ctx context.Context, user *models.User) (uint64, error)
	GetUserById(ctx context.Context, id uint64) (*models.User, error)
	GetUserByEmail(ctx context.Context, email string) (*models.User, error)
}

// var implementation UserRepository

// func SetUserRepository(repository UserRepository) {
// 	implementation = repository
// }

// func InsertUser(ctx context.Context, user *models.User) (uint64, error) {
// 	return implementation.InsertUser(ctx, user)
// }

// func GetUserById(ctx context.Context, id uint64) (*models.User, error) {
// 	return implementation.GetUserById(ctx, id)
// }

// func GetUserByEmail(ctx context.Context, email string) (*models.User, error) {
// 	return implementation.GetUserByEmail(ctx, email)
// }

// func Close() error {
// 	return implementation.Close()
// }
