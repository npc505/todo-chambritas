package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/npc505/backend/models"
	"github.com/npc505/backend/server"
)

type InsertUpdateToCartRequest struct {
	ProductoID uint64 `json:"producto_id"`
	Cantidad   uint32 `json:"cantidad"`
}

type RemoveFromCartRequest struct {
	ProductoID uint64 `json:"producto_id"`
}

func UpsertCartItemHandler(s server.Server) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req InsertUpdateToCartRequest
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		claims := r.Context().Value("userClaims").(*models.AppClaims)

		// Obtener el stock actual del producto
		stock, err := s.ProductRepo().GetProductStock(r.Context(), req.ProductoID)
		if err != nil {
			http.Error(w, "Error al obtener el stock del producto", http.StatusInternalServerError)
			return
		}
		if stock == nil || *stock == 0 {
			http.Error(w, "Producto sin stock", http.StatusBadRequest)
			return
		}

		// Ajustar cantidad si excede el stock
		if req.Cantidad > *stock {
			req.Cantidad = *stock
		}

		// Hacer el upsert al carrito
		err = s.CartRepo().UpsertCartItem(r.Context(), claims.UserId, req.ProductoID, req.Cantidad)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusOK)
	}
}

func RemoveItemFromCartHandler(s server.Server) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req RemoveFromCartRequest
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		claims := r.Context().Value("userClaims").(*models.AppClaims)

		err := s.CartRepo().RemoveItemFromCart(r.Context(), claims.UserId, req.ProductoID)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusOK)
	}
}

func ClearCartHandler(s server.Server) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		claims := r.Context().Value("userClaims").(*models.AppClaims)

		err := s.CartRepo().ClearCart(r.Context(), claims.UserId)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusOK)
	}
}

func GetCartHandler(s server.Server) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		claims := r.Context().Value("userClaims").(*models.AppClaims)

		items, err := s.CartRepo().GetCartByUserId(r.Context(), claims.UserId)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(items)
	}
}
