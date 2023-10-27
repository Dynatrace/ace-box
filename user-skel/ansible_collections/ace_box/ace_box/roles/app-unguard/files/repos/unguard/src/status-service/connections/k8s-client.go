package connections

import (
	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/rest"
)

var clientset *kubernetes.Clientset = nil

// KubernetesClient create a kubernetes.Clientset or retrieve it if one exists already
func KubernetesClient() *kubernetes.Clientset {
	if clientset != nil {
		return clientset
	}

	config, err := rest.InClusterConfig()
	if err != nil {
		panic(err.Error())
	}

	// creates the clientset
	clientset, err := kubernetes.NewForConfig(config)
	if err != nil {
		panic(err.Error())
	}

	return clientset
}
