package middleware

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"strings"

	utils "github.com/jdgo-mars/yied-api/pkg"
)

type userContext string

const UserInfoKey userContext = "userInfo"

// Middleware to validate Google OAuth token
func GoogleOAuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Extract Authorization header
		authHeader := r.Header.Get("Authorization")
		if authHeader == "" {
			utils.WriteJSONError(w, "Missing Authorization header", http.StatusUnauthorized)
			return
		}

		parts := strings.Split(authHeader, " ")
		if len(parts) != 2 || parts[0] != "Bearer" {
			utils.WriteJSONError(w, "Invalid Authorization header format", http.StatusUnauthorized)
			return
		}

		token := parts[1]

		userInfo, err := validateGoogleToken(token)
		if err != nil {
			utils.WriteJSONError(w, fmt.Sprintf("Invalid token: %v", err), http.StatusUnauthorized)
			return
		}

		// Add user info to the request context (optional)
		r = r.WithContext(context.WithValue(r.Context(), UserInfoKey, userInfo))

		// Proceed to the next handler
		next.ServeHTTP(w, r)
	})
}

func validateGoogleToken(accessToken string) (map[string]interface{}, error) {
	resp, err := http.Get("https://oauth2.googleapis.com/tokeninfo?id_token=" + accessToken)
	if err != nil {
		return nil, fmt.Errorf("failed to validate token: %v", err)
	}

	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("token validation failed with status code: %d", resp.StatusCode)
	}

	// Decode the tokeninfo response
	var tokenInfo map[string]interface{}
	if err := json.NewDecoder(resp.Body).Decode(&tokenInfo); err != nil {
		return nil, fmt.Errorf("failed to decode token info: %v", err)
	}

	if tokenInfo["aud"] != os.Getenv("GOOGLE_CLIENT_ID") {
		return nil, fmt.Errorf("invalid audience")
	}
	return tokenInfo, nil
}
