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
