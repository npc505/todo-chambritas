package models

type Cart struct {
	ProductoID          int64   `json:"producto_id"`
	Nombre              string  `json:"nombre"`
	Precio              float64 `json:"precio"`
	ImagenDir           string  `json:"imagen_dir"`
	Cantidad            int     `json:"cantidad"`
	PorcentajeDescuento float64 `json:"porcentaje_descuento"`
	Stock               int     `json:"stock"`
}
