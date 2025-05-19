package repository

import (
	"context"

	"github.com/npc505/backend/models"
)

type ProductRepository interface {
	InsertProduct(ctx context.Context, product *models.Product) (uint64, error)
	GetProductById(ctx context.Context, id uint64) (*models.Product, error)
	GetAllProducts(ctx context.Context) ([]*models.Product, error)
	UpdateProduct(ctx context.Context, product *models.Product) error
	DeleteProduct(ctx context.Context, id uint64) error
	Close() error
}

// var productImplementation ProductRepository

// func SetProductRepository(repo ProductRepository) {
// 	productImplementation = repo
// }

// func InsertProduct(ctx context.Context, product *models.Product) error {
// 	return productImplementation.InsertProduct(ctx, product)
// }

// func GetProductById(ctx context.Context, id int64) (*models.Product, error) {
// 	return productImplementation.GetProductById(ctx, id)
// }

// func DeleteProduct(ctx context.Context, id int64) error {
// 	return productImplementation.DeleteProduct(ctx, id)
// }

// func GetAllProducts(ctx context.Context) ([]*models.Product, error) {
// 	return productImplementation.GetAllProducts(ctx)
// }
