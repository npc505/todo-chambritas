package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/npc505/backend/models"
	"github.com/npc505/backend/server"
)

type ProductData struct {
	Nombre              string        `json:"nombre"`
	Calificacion        float32       `json:"calificacion"`
	Marca               string        `json:"marca"`
	CodigoColor         string        `json:"codigo_color"`
	Descripcion         string        `json:"descripcion"`
	Precio              float64       `json:"precio"`
	Stock               int           `json:"stock"`
	Fibra               string        `json:"fibra"`
	Grosor              models.Grosor `json:"grosor"`
	Peso                float64       `json:"peso"`
	Largo               float64       `json:"largo"`
	Calibre             int           `json:"calibre"`
	AgujasSugeridas     float64       `json:"agujas_sugeridas"`
	GanchosSugeridos    float64       `json:"ganchos_sugeridos"`
	PorcentajeDescuento float64       `json:"porcentaje_descuento"`
	ImagenDir           string        `json:"imagen_dir"`
}

type ProductResponse struct {
	ID uint64 `json:"id"`
	ProductData
}

type ProductUpdateResponse struct {
	Message string `json:"message"`
}

//Debug
func InsertProductHandler(s server.Server) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var ProductRequest = ProductData{}
		if err := json.NewDecoder(r.Body).Decode(&ProductRequest); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		product := models.Product{
			Nombre:              ProductRequest.Nombre,
			Calificacion:        ProductRequest.Calificacion,
			Marca:               ProductRequest.Marca,
			CodigoColor:         ProductRequest.CodigoColor,
			Descripcion:         ProductRequest.Descripcion,
			Precio:              ProductRequest.Precio,
			Stock:               ProductRequest.Stock,
			Fibra:               ProductRequest.Fibra,
			Grosor:              ProductRequest.Grosor,
			Peso:                ProductRequest.Peso,
			Largo:               ProductRequest.Largo,
			Calibre:             ProductRequest.Calibre,
			AgujasSugeridas:     ProductRequest.AgujasSugeridas,
			GanchosSugeridos:    ProductRequest.GanchosSugeridos,
			PorcentajeDescuento: ProductRequest.PorcentajeDescuento,
			ImagenDir:           ProductRequest.ImagenDir,
		}

		id, err := s.ProductRepo().InsertProduct(r.Context(), &product)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(ProductResponse{
			ID:          id,
			ProductData: ProductRequest,
		})

	}
}

func GetProductById(s server.Server) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		params := mux.Vars(r)
		idStr := params["id"]
		id, err := strconv.ParseUint(idStr, 10, 64)
		if err != nil {
			http.Error(w, "Invalid product ID", http.StatusBadRequest)
			return
		}
		product, err := s.ProductRepo().GetProductById(r.Context(), id)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(product)
	}
}

//Debug
func UpdateProduct(s server.Server) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var ProductRequest = ProductData{}
		if err := json.NewDecoder(r.Body).Decode(&ProductRequest); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		params := mux.Vars(r)
		idStr := params["id"]
		id, err := strconv.ParseUint(idStr, 10, 64)
		if err != nil {
			http.Error(w, "Invalid product ID", http.StatusBadRequest)
			return
		}
		product := models.Product{
			ID:                  id,
			Nombre:              ProductRequest.Nombre,
			Calificacion:        ProductRequest.Calificacion,
			Marca:               ProductRequest.Marca,
			CodigoColor:         ProductRequest.CodigoColor,
			Descripcion:         ProductRequest.Descripcion,
			Precio:              ProductRequest.Precio,
			Stock:               ProductRequest.Stock,
			Fibra:               ProductRequest.Fibra,
			Grosor:              ProductRequest.Grosor,
			Peso:                ProductRequest.Peso,
			Largo:               ProductRequest.Largo,
			Calibre:             ProductRequest.Calibre,
			AgujasSugeridas:     ProductRequest.AgujasSugeridas,
			GanchosSugeridos:    ProductRequest.GanchosSugeridos,
			PorcentajeDescuento: ProductRequest.PorcentajeDescuento,
			ImagenDir:           ProductRequest.ImagenDir,
		}

		err = s.ProductRepo().UpdateProduct(r.Context(), &product)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(ProductUpdateResponse{
			Message: "Product updated",
		})

	}
}

func ListProduct(s server.Server) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var err error
		pageStr := r.URL.Query().Get("page")
		pageSizeStr := r.URL.Query().Get("pageSize")

		var page uint64 = 0
		var pageSize uint64 = 30 // default page size

		if pageStr != "" {
			page, err = strconv.ParseUint(pageStr, 10, 64)
			if err != nil {
				http.Error(w, "Invalid page parameter", http.StatusBadRequest)
				return
			}
		}

		if pageSizeStr != "" {
			pageSize, err = strconv.ParseUint(pageSizeStr, 10, 64)
			if err != nil {
				http.Error(w, "Invalid pageSize parameter", http.StatusBadRequest)
				return
			}
		}

		products, err := s.ProductRepo().ListProducts(r.Context(), page, pageSize)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(products)
	}
}
