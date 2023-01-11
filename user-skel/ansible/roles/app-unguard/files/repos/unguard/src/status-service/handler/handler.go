package handler

import (
	"context"
	"github.com/labstack/echo/v4"
	v12 "k8s.io/api/apps/v1"
	v1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"net/http"
	"status-service/connections"
	"status-service/utils"
	"strings"
)

type DeploymentsDto = map[string]v12.Deployment

type Health struct {
	Healthy bool `json:"healthy"`
}
type HealthDto struct {
	Microservices map[string]Health `json:"microservices"`
	Available     int               `json:"available"`
	Total         int               `json:"total"`
}

var deploymentsToIgnore = utils.GetEnv("IGNORED_DEPLOYMENTS", "")

/**
GET HANDLERS
*/

// GetDeployments attach a DeploymentsDto to be sent as JSON response
func GetDeployments(c echo.Context) error {
	return c.JSON(http.StatusOK, getDeployments())
}

// GetHealth fetches HealthDto containing the overall health overview of deployments within the specified namespace (environment)
func GetHealth(c echo.Context) error {
	deployments := getDeployments()
	microserviceHealthMap := make(map[string]Health)
	available := 0
	total := 0

	for _, deployment := range deployments {
		// ignore deployments from health check
		if strings.Contains(deploymentsToIgnore, deployment.Name) {
			continue
		}

		microserviceHealthMap[deployment.Name] = Health{
			Healthy: assessHealth(deployment.Status.Conditions, &available, &total),
		}
	}

	return c.JSON(http.StatusOK, &HealthDto{
		Microservices: microserviceHealthMap,
		Available:     available,
		Total:         total,
	})
}

// getDeployments fetch deployments from the Kubernetes API within the specified namespace (environment) and construct a DeploymentsDto
func getDeployments() DeploymentsDto {
	deployments, _ := connections.KubernetesClient().AppsV1().Deployments(
		utils.GetEnv("KUBERNETES_NAMESPACE", "unguard")).List(context.TODO(), v1.ListOptions{})
	deploymentDetailsMap := make(DeploymentsDto)

	for _, deployment := range deployments.Items {
		deploymentDetailsMap[deployment.Name] = deployment
	}

	return deploymentDetailsMap
}

// assessHealth count how many deployments with "Avaialble" condition are in the array, updates count and total respectively
func assessHealth(conditions []v12.DeploymentCondition, available *int, total *int) bool {
	*total = *total + 1
	for _, condition := range conditions {
		if condition.Type == "Available" && condition.Status == "True" {
			*available = *available + 1
			return true
		}
	}

	return false
}
