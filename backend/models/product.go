package models

type Grosor string

const (
	GrosorFino   Grosor = "FINO"
	GrosorMedio  Grosor = "MEDIO"
	GrosorGrueso Grosor = "GRUESO"
)

type Product struct {
	ID                  int64   `json:"id"`
	Nombre              string  `json:"nombre"`
	Calificacion        float32 `json:"calificacion"`
	Marca               string  `json:"marca"`
	CodigoColor         string  `json:"codigo_color"`
	Descripcion         string  `json:"descripcion"`
	Precio              float64 `json:"precio"`
	Stock               int     `json:"stock"`
	Fibra               string  `json:"fibra"`
	Grosor              Grosor  `json:"grosor"`
	Peso                float64 `json:"peso"`
	Largo               float64 `json:"largo"`
	Calibre             int     `json:"calibre"`
	AgujasSugeridas     float64 `json:"agujas_sugeridas"`
	GanchosSugeridos    float64 `json:"ganchos_sugeridos"`
	PorcentajeDescuento float64 `json:"porcentaje_descuento"`
	ImagenDir           string  `json:"imagen_dir"`
}
