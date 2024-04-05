terraform {

}

provider "google" {
  project = var.gcloud_project
  region  = join("-", slice(split("-", var.gcloud_zone), 0, 2))
}
