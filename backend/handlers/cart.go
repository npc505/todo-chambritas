package handlers

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/npc505/backend/models"
	"github.com/npc505/backend/server"
)

type AddUpdateToCartItem struct {
	Cantidad uint32 `json:"cantidad"`
}

type RemoveFromCartRequest struct {
	ProductoID uint64 `json:"producto_id"`
}

func UpdateCartItemHandler(s server.Server) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		productoIDStr := vars["producto_id"]

		productoID, err := strconv.ParseUint(productoIDStr, 10, 64)
		if err != nil {
			http.Error(w, "ID de producto inválido", http.StatusBadRequest)
			return
		}

		var req AddUpdateToCartItem
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		claims := r.Context().Value("userClaims").(*models.AppClaims)

		stock, err := s.ProductRepo().GetProductStock(r.Context(), productoID)
		if err != nil || stock == nil || *stock == 0 {
			http.Error(w, "Producto sin stock", http.StatusBadRequest)
			return
		}

		if req.Cantidad > *stock {
			req.Cantidad = *stock
		}

		err = s.CartRepo().UpsertCartItem(r.Context(), claims.UserId, productoID, req.Cantidad)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		resp := AddUpdateToCartItem{
			Cantidad: req.Cantidad,
		}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(resp)
	}
}

func AddToCartHandler(s server.Server) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		productoIDStr := vars["producto_id"]

		productoID, err := strconv.ParseUint(productoIDStr, 10, 64)
		if err != nil {
			http.Error(w, "ID de producto inválido", http.StatusBadRequest)
			return
		}

		var req AddUpdateToCartItem
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		claims := r.Context().Value("userClaims").(*models.AppClaims)

		stock, err := s.ProductRepo().GetProductStock(r.Context(), productoID)
		if err != nil || stock == nil || *stock == 0 {
			http.Error(w, "Producto sin stock", http.StatusBadRequest)
			return
		}

		currentQty, err := s.CartRepo().GetCartQuantity(r.Context(), claims.UserId, productoID)
		if err != nil && err != sql.ErrNoRows {
			http.Error(w, "Error al obtener cantidad del carrito", http.StatusInternalServerError)
			return
		}

		newQty := currentQty + req.Cantidad
		if newQty > *stock {
			newQty = *stock
		}

		err = s.CartRepo().UpsertCartItem(r.Context(), claims.UserId, productoID, newQty)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		resp := AddUpdateToCartItem{
			Cantidad: newQty,
		}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(resp)
	}
}

func RemoveItemFromCartHandler(s server.Server) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		productoIDStr := vars["producto_id"]

		productoID, err := strconv.ParseUint(productoIDStr, 10, 64)
		if err != nil {
			http.Error(w, "ID de producto inválido", http.StatusBadRequest)
			return
		}

		claims := r.Context().Value("userClaims").(*models.AppClaims)

		err = s.CartRepo().RemoveItemFromCart(r.Context(), claims.UserId, productoID)
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
