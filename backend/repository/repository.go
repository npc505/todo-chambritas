package repository

type Repository interface {
	UserRepository
	ProductRepository
	CartRepository
	Close() error
}
