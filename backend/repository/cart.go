package repository

import (
	"context"

	"github.com/npc505/backend/models"
)

type CartRepository interface {
	AddItemToCart(ctx context.Context, userId int64, productId int64, quantity int) error
	RemoveItemFromCart(ctx context.Context, userId int64, productId int64) error
	GetCartByUserId(ctx context.Context, userId int64) ([]*models.Cart, error)
	ClearCart(ctx context.Context, userId int64) error
	Close() error
}

// var cartImplementation CartRepository

// func SetCartRepository(repo CartRepository) {
// 	cartImplementation = repo
// }

// func AddToCart(ctx context.Context, userId, productId int64, quantity int) error {
// 	return cartImplementation.AddItemToCart(ctx, userId, productId, quantity)
// }

// func GetCartByUserId(ctx context.Context, userId int64) ([]*models.Cart, error) {
// 	return cartImplementation.GetCartByUserId(ctx, userId)
// }

// func RemoveItemFromCart(ctx context.Context, userId, productId int64) error {
// 	return cartImplementation.RemoveItemFromCart(ctx, userId, productId)
// }

// func ClearCart(ctx context.Context, userId int64) error {
// 	return cartImplementation.ClearCart(ctx, userId)
// }
