package main

import (
	"fmt"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/labstack/gommon/log"
	"net/http"
	"status-service/handler"
	"status-service/utils"
)

var serverPort = utils.GetEnv("SERVER_PORT", "8083")
var apiPath = utils.GetEnv("API_PATH", "/status-service")

func main() {
	server := echo.New()

	server.Use(middleware.Logger())
	server.Use(middleware.Recover())

	api := server.Group(apiPath)

	api.GET("/deployments", handler.GetDeployments)
	api.GET("/deployments/health", handler.GetHealth)

	if err := server.Start(fmt.Sprintf(":%s", serverPort)); err != http.ErrServerClosed {
		log.Fatal(err)
	}
}
