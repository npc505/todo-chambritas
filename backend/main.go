package main

import (
	"context"
	"log"
	"os"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"github.com/npc505/backend/handlers"
	"github.com/npc505/backend/middleware"
	"github.com/npc505/backend/server"
)

func main() {
	err := godotenv.Load()

	if err != nil {
		log.Fatal("Error loading .env file")
	}

	PORT := os.Getenv("PORT")
	JWT_SECRET := os.Getenv("JWT_SECRET")
	DATABASE_URL := os.Getenv("DATABASE_URL")

	config := &server.Config{
		Port:        PORT,
		JWTSecret:   JWT_SECRET,
		DatabaseURL: DATABASE_URL,
	}

	s, err := server.NewServer(context.Background(), config)

	if err != nil {
		log.Fatal("Error starting server", err)
	}

	s.Start(BindRoutes)
}

func BindRoutes(s server.Server, r *mux.Router) error {
	r.Use(middleware.CheckAuthMiddleware(s))
	r.HandleFunc("/", handlers.HomeHanlder(s)).Methods("GET")

	//user
	r.HandleFunc("/signup", handlers.SignUpHandler(s)).Methods("POST")
	r.HandleFunc("/login", handlers.LoginHandler(s)).Methods("POST")
	r.HandleFunc("/me", handlers.MeHandler(s)).Methods("GET")

	//products
	r.HandleFunc("/products", handlers.InsertProductHandler(s)).Methods("POST")
	r.HandleFunc("/products/{id}", handlers.GetProductById(s)).Methods("GET")
	r.HandleFunc("/products/{id}", handlers.UpdateProduct(s)).Methods("PUT")
	r.HandleFunc("/products", handlers.ListProduct(s)).Methods("GET")

	//cart
	r.HandleFunc("/cart", handlers.GetCartHandler(s)).Methods("GET")                    // obtener carrito
	r.HandleFunc("/cart/item", handlers.UpsertCartItemHandler(s)).Methods("PUT")        // actualizar cantidad (añadir producto y su cantidad)
	r.HandleFunc("/cart/item", handlers.RemoveItemFromCartHandler(s)).Methods("DELETE") // quitar un item
	r.HandleFunc("/cart", handlers.ClearCartHandler(s)).Methods("DELETE")               // limpiar carrito

	return nil
}
