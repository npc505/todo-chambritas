package server

import (
	"context"
	"errors"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/npc505/backend/auth"
	"github.com/npc505/backend/database"
	"github.com/npc505/backend/repository"
	"github.com/rs/cors"
)

type Config struct {
	Port           string
	JWTSecret      string
	DatabaseURL    string
	GoogleClientID string
}

type Server interface {
	Config() *Config
	UserRepo() repository.UserRepository
	ProductRepo() repository.ProductRepository
	CartRepo() repository.CartRepository
	AuthProvider() auth.AuthProvider
}

type Broker struct {
	config       *Config
	router       *mux.Router
	repository   repository.Repository
	authProvider auth.AuthProvider
}

func (b *Broker) Config() *Config {
	return b.config
}

func (b *Broker) UserRepo() repository.UserRepository {
	return b.repository
}
func (b *Broker) ProductRepo() repository.ProductRepository {
	return b.repository
}
func (b *Broker) CartRepo() repository.CartRepository {
	return b.repository
}

func (b *Broker) AuthProvider() auth.AuthProvider {
	return b.authProvider
}

func NewServer(ctx context.Context, config *Config) (*Broker, error) {
	if config.Port == "" {
		return nil, errors.New("config.Port is required")
	}
	if config.JWTSecret == "" {
		return nil, errors.New("config.JWTSecret is required")
	}
	if config.DatabaseURL == "" {
		return nil, errors.New("config.DatabaseURL is required")
	}
	if config.GoogleClientID == "" {
		return nil, errors.New("config.GoogleClientID is required")
	}

	provider := auth.NewGoogleProvider(config.GoogleClientID)

	broker := &Broker{
		config:       config,
		router:       mux.NewRouter(),
		authProvider: provider,
	}

	return broker, nil
}

func (b *Broker) corsHandler() http.Handler {
	corsHandler := cors.New(cors.Options{
		AllowedOrigins: []string{"http://localhost:5501", "http://127.0.0.1:5501",
			"http://localhost:5173", "http://127.0.0.1:5173"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE"},
		AllowedHeaders:   []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
	})
	return corsHandler.Handler(b.router)
}

func (b *Broker) Start(binder func(s Server, r *mux.Router) error) error {
	b.router = mux.NewRouter()
	binder(b, b.router)
	repo, err := database.NewPostgresRepository(b.config.DatabaseURL)
	if err != nil {
		log.Fatal(err)
	}
	b.repository = repo

	log.Println("Starting server on port", b.Config().Port)
	if err := http.ListenAndServe(b.Config().Port, b.corsHandler()); err != nil {
		log.Fatal("Failed to start server", err)
	}
	return nil
}
