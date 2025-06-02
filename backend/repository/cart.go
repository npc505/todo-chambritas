package repository

import (
	"context"

	"github.com/npc505/backend/models"
)

type CartRepository interface {
	AddItemToCart(ctx context.Context, userId uint64, productId uint64, quantity uint) error
	RemoveItemFromCart(ctx context.Context, userId uint64, productId uint64) error
	GetCartByUserId(ctx context.Context, userId uint64) ([]*models.CartItem, error)
	ClearCart(ctx context.Context, userId uint64) error
}
