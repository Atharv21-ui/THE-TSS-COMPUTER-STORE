package main

import (
	"context"
	"encoding/json"
	"net/http"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

type Response struct {
	Message string `json:"message"`
	Status  string `json:"status"`
}

func handler(ctx context.Context, request events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {
	// Create a sample response
	resp := Response{
		Message: "Hello from Go Serverless Function on Netlify!",
		Status:  "success",
	}

	body, err := json.Marshal(resp)
	if err != nil {
		return &events.APIGatewayProxyResponse{
			StatusCode: http.StatusInternalServerError,
			Body:       "Error generating response",
		}, nil
	}

	return &events.APIGatewayProxyResponse{
		StatusCode: http.StatusOK,
		Headers: map[string]string{
			"Content-Type":                 "application/json",
			"Access-Control-Allow-Origin":  "*", // Allow CORS for frontend integration
			"Access-Control-Allow-Headers": "Content-Type",
		},
		Body: string(body),
	}, nil
}

func main() {
	lambda.Start(handler)
}
