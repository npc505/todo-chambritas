package database

import (
	"context"
	"database/sql"
	"fmt"

	"github.com/npc505/backend/models"

	_ "github.com/lib/pq"
)

// Registro del driver de PostgreSQL

type PostgresRepository struct {
	db *sql.DB
}

func NewPostgresRepository(url string) (*PostgresRepository, error) {
	fmt.Println(url)
	db, err := sql.Open("postgres", url)
	if err != nil {
		return nil, err
	}
	return &PostgresRepository{db: db}, nil
}

func (repo *PostgresRepository) Close() error {
	return repo.db.Close()
}

// Users

func (repo *PostgresRepository) InsertUser(ctx context.Context, user *models.User) (uint64, error) {
	row := repo.db.QueryRowContext(ctx, `
		INSERT INTO usuarios
		(nombre, apellido_paterno, apellido_materno, correo, contraseña, celular) 
		VALUES ($1, $2, $3, $4, $5, $6)
		RETURNING usuario_id`,
		user.Nombre, user.ApellidoPaterno, user.ApellidoMaterno, user.Correo, user.Contrasena, user.Celular,
	)
	var id uint64
	if err := row.Scan(&id); err != nil {
		return 0, err
	}
	return id, nil
}

func (repo *PostgresRepository) GetUserById(ctx context.Context, id uint64) (*models.User, error) {
	row := repo.db.QueryRowContext(ctx, `
		SELECT usuario_id, nombre, apellido_paterno, apellido_materno, correo, celular, fecha_registro, activo
		FROM usuarios
		WHERE usuario_id = $1`, id)

	var user models.User
	err := row.Scan(&user.ID, &user.Nombre, &user.ApellidoPaterno, &user.ApellidoMaterno,
		&user.Correo, &user.Celular, &user.FechaRegistro, &user.Activo)

	if err != nil {
		return nil, err
	}
	return &user, nil
}

func (repo *PostgresRepository) GetUserByEmail(ctx context.Context, email string) (*models.User, error) {
	row := repo.db.QueryRowContext(ctx, `
		SELECT usuario_id, nombre, apellido_paterno, apellido_materno, correo, contraseña, celular, fecha_registro, activo
		FROM usuarios
		WHERE correo = $1`, email)

	var user models.User
	err := row.Scan(&user.ID, &user.Nombre, &user.ApellidoPaterno, &user.ApellidoMaterno,
		&user.Correo, &user.Contrasena, &user.Celular, &user.FechaRegistro, &user.Activo)

	if err != nil {
		return nil, err
	}
	return &user, nil
}

// Products

func (repo *PostgresRepository) InsertProduct(ctx context.Context, product *models.Product) error {
	_, err := repo.db.ExecContext(ctx, `
		INSERT INTO productos
		(nombre, calificacion, marca, codigo_color, descripcion, precio, stock, fibra, grosor, peso, largo, calibre, agujas_sugeridas, ganchos_sugeridos, porcentaje_descuento, imagen_dir)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)`,
		product.Nombre, product.Calificacion, product.Marca, product.CodigoColor, product.Descripcion, product.Precio,
		product.Stock, product.Fibra, product.Grosor, product.Peso, product.Largo, product.Calibre,
		product.AgujasSugeridas, product.GanchosSugeridos, product.PorcentajeDescuento, product.ImagenDir,
	)
	return err
}

func (repo *PostgresRepository) GetProductById(ctx context.Context, id int64) (*models.Product, error) {
	row := repo.db.QueryRowContext(ctx, `
		SELECT * FROM productos
		WHERE producto_id = $1`, id)

	var p models.Product
	err := row.Scan(&p.ID, &p.Nombre, &p.Calificacion, &p.Marca, &p.CodigoColor, &p.Descripcion, &p.Precio, &p.Stock,
		&p.Fibra, &p.Grosor, &p.Peso, &p.Largo, &p.Calibre, &p.AgujasSugeridas, &p.GanchosSugeridos, &p.PorcentajeDescuento, &p.ImagenDir)
	if err != nil {
		return nil, err
	}
	return &p, nil
}

func (repo *PostgresRepository) GetAllProducts(ctx context.Context) ([]*models.Product, error) {
	rows, err := repo.db.QueryContext(ctx, `SELECT * FROM productos`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var products []*models.Product
	for rows.Next() {
		var p models.Product
		err := rows.Scan(&p.ID, &p.Nombre, &p.Calificacion, &p.Marca, &p.CodigoColor, &p.Descripcion, &p.Precio, &p.Stock,
			&p.Fibra, &p.Grosor, &p.Peso, &p.Largo, &p.Calibre, &p.AgujasSugeridas, &p.GanchosSugeridos, &p.PorcentajeDescuento, &p.ImagenDir)
		if err != nil {
			return nil, err
		}
		products = append(products, &p)
	}
	return products, nil
}

func (repo *PostgresRepository) UpdateProduct(ctx context.Context, product *models.Product) error {
	_, err := repo.db.ExecContext(ctx, `
		UPDATE productos
		SET nombre = $1, calificacion = $2, marca = $3, codigo_color = $4, descripcion = $5, precio = $6,
			stock = $7, fibra = $8, grosor = $9, peso = $10, largo = $11, calibre = $12,
			agujas_sugeridas = $13, ganchos_sugeridos = $14, porcentaje_descuento = $15, imagen_dir = $16
		WHERE producto_id = $17`,
		product.Nombre, product.Calificacion, product.Marca, product.CodigoColor, product.Descripcion, product.Precio,
		product.Stock, product.Fibra, product.Grosor, product.Peso, product.Largo, product.Calibre,
		product.AgujasSugeridas, product.GanchosSugeridos, product.PorcentajeDescuento, product.ImagenDir, product.ID)
	return err
}

func (repo *PostgresRepository) DeleteProduct(ctx context.Context, id int64) error {
	_, err := repo.db.ExecContext(ctx, `
		DELETE FROM productos
		WHERE producto_id = $1`, id)
	return err
}

func (repo *PostgresRepository) AddItemToCart(ctx context.Context, userId int64, productId int64, quantity int) error {
	_, err := repo.db.ExecContext(ctx, `
		INSERT INTO carrito_de_compras (usuario_id, producto_id, cantidad)
		VALUES ($1, $2, $3)
		ON CONFLICT (usuario_id, producto_id)
		DO UPDATE SET cantidad = carrito_de_compras.cantidad + $3`, userId, productId, quantity)
	return err
}

func (repo *PostgresRepository) RemoveItemFromCart(ctx context.Context, userId int64, productId int64) error {
	_, err := repo.db.ExecContext(ctx, `
		DELETE FROM carrito_de_compras
		WHERE usuario_id = $1 AND producto_id = $2`, userId, productId)
	return err
}

func (repo *PostgresRepository) GetCartByUserId(ctx context.Context, userId int64) ([]*models.Cart, error) {
	rows, err := repo.db.QueryContext(ctx, `
		SELECT 
			p.producto_id,
			p.nombre,
			p.precio,
			p.imagen_dir,
			c.cantidad,
			p.porcentaje_descuento,
			p.stock
		FROM carrito_de_compras c
		JOIN productos p ON c.producto_id = p.producto_id
		WHERE c.usuario_id = $1`, userId)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var cartItems []*models.Cart
	for rows.Next() {
		var item models.Cart
		if err := rows.Scan(
			&item.ProductoID,
			&item.Nombre,
			&item.Precio,
			&item.ImagenDir,
			&item.Cantidad,
			&item.PorcentajeDescuento,
			&item.Stock,
		); err != nil {
			return nil, err
		}
		cartItems = append(cartItems, &item)
	}
	return cartItems, nil
}

func (repo *PostgresRepository) ClearCart(ctx context.Context, userId int64) error {
	_, err := repo.db.ExecContext(ctx, `
		DELETE FROM carrito_de_compras
		WHERE usuario_id = $1`, userId)
	return err
}
