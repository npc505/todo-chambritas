package repository

import (
	"context"

	"github.com/npc505/backend/models"
)

type CartRepository interface {
	UpsertCartItem(ctx context.Context, userId uint64, productId uint64, quantity uint32) error
	GetCartQuantity(ctx context.Context, userId uint64, productId uint64) (uint32, error)
	RemoveItemFromCart(ctx context.Context, userId uint64, productId uint64) error
	GetCartByUserId(ctx context.Context, userId uint64) ([]*models.CartItem, error)
	ClearCart(ctx context.Context, userId uint64) error
}
