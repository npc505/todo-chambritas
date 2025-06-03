package models

type CartItem struct {
	ProductoID          uint64  `json:"producto_id"`
	Nombre              string  `json:"nombre"`
	Marca               string  `json:"marca"`
	Precio              float64 `json:"precio"`
	PorcentajeDescuento float64 `json:"porcentaje_descuento"`
	ImagenDir           string  `json:"imagen_dir"`
	Cantidad            uint    `json:"cantidad"`
}
