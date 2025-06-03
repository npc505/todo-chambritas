package repository

import (
	"context"

	"github.com/npc505/backend/models"
)

type ProductRepository interface {
	InsertProduct(ctx context.Context, product *models.Product) (uint64, error)
	GetProductById(ctx context.Context, id uint64) (*models.Product, error)
	GetProductStock(ctx context.Context, id uint64) (*uint32, error)
	ListProducts(ctx context.Context, page uint64, pageSize uint64) ([]*models.Product, error)
	UpdateProduct(ctx context.Context, product *models.Product) error //Quitar ya que no se va a usar
}
