terraform {

}

provider "google" {
  project = var.gcloud_project
  region  = join("-", slice(split("-", var.gcloud_zone), 0, 2))
}

## For creating UUIDs
resource "random_id" "uuid" {
  byte_length = 4
}
