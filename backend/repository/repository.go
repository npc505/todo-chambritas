package repository

type Repository struct {
	User    UserRepository
	Product ProductRepository
	Cart    CartRepository
}
