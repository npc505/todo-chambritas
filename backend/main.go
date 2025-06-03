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
	GOOGLE_CLIENT_ID := os.Getenv("GOOGLE_CLIENT_ID")

	config := &server.Config{
		Port:           PORT,
		JWTSecret:      JWT_SECRET,
		DatabaseURL:    DATABASE_URL,
		GoogleClientID: GOOGLE_CLIENT_ID,
	}

	s, err := server.NewServer(context.Background(), config)

	if err != nil {
		log.Fatal("Error starting server", err)
	}

	s.Start(BindRoutes)
}

func BindRoutes(s server.Server, r *mux.Router) error {
	r.Use(middleware.CheckAuthMiddleware(s))

	//user
	r.HandleFunc("/signup", handlers.SignUpHandler(s)).Methods("POST")           //registro
	r.HandleFunc("/login", handlers.LoginHandler(s)).Methods("POST")             //inicio de sesión por correo y contraseña
	r.HandleFunc("/auth/google", handlers.GoogleLoginHandler(s)).Methods("POST") //inicio de sesión por Google
	//r.HandleFunc("/me", handlers.MeHandler(s)).Methods("GET")					//obtener información de un usuario

	//products
	//r.HandleFunc("/products", handlers.InsertProductHandler(s)).Methods("POST")	//añadir producto
	r.HandleFunc("/products/{id}", handlers.GetProductById(s)).Methods("GET") //obtener un producto
	//r.HandleFunc("/products/{id}", handlers.UpdateProduct(s)).Methods("PUT")  //actualizar un producto
	r.HandleFunc("/products", handlers.ListProduct(s)).Methods("GET") //obtener todos los productos

	//cart
	r.HandleFunc("/cart", handlers.GetCartHandler(s)).Methods("GET")                    // obtener carrito
	r.HandleFunc("/cart/item", handlers.UpsertCartItemHandler(s)).Methods("PUT")        // actualizar cantidad (añadir producto y su cantidad)
	r.HandleFunc("/cart/item", handlers.RemoveItemFromCartHandler(s)).Methods("DELETE") // quitar un item del carrito
	r.HandleFunc("/cart", handlers.ClearCartHandler(s)).Methods("DELETE")               // limpiar carrito

	return nil
}
