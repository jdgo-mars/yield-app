package main

import (
	"log"
	"net/http"
	"os"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/jdgo-mars/yied-api/middleware"
	"github.com/joho/godotenv"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	// Define allowed CORS options
	corsOptions := handlers.AllowedOrigins([]string{"*"})
	corsMethods := handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE", "OPTIONS"})
	corsHeaders := handlers.AllowedHeaders([]string{"Content-Type", "Authorization"})
	corsCredentials := handlers.AllowCredentials()

	r := mux.NewRouter()

	// Protected routes
	protected := r.PathPrefix("/api").Subrouter()
	protected.Use(middleware.GoogleOAuthMiddleware)

	handler := handlers.CORS(corsOptions, corsMethods, corsHeaders, corsCredentials)(protected)

	// Start the server
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	log.Printf("Server is running on port %s", port)
	http.ListenAndServe(":"+port, handler)
}
