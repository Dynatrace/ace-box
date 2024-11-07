# Copyright 2024 Dynatrace LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

resource "azurerm_resource_group" "rg" {
  name     = "${var.name_prefix}-rg-${random_id.uuid.hex}"
  location = var.azure_location
  tags = {
    environment = "acebox"
  }
}

resource "azurerm_virtual_network" "vnet" {
  name                = "acebox-vnet"
  address_space       = ["10.0.0.0/16"]
  location            = var.azure_location
  resource_group_name = azurerm_resource_group.rg.name
  tags = {
    environment = "acebox"
  }
}

resource "azurerm_subnet" "ace-box_subnet" {
  name                 = "acebox_subnet"
  resource_group_name  = azurerm_resource_group.rg.name
  virtual_network_name = azurerm_virtual_network.vnet.name
  address_prefixes     = ["10.0.1.0/24"]
}

resource "azurerm_public_ip" "acebox_publicip" {
  name                = "acebox_publicip"
  location            = var.azure_location
  resource_group_name = azurerm_resource_group.rg.name
  allocation_method   = "Static"
  sku                 = "Basic"
  tags = {
    environment = "acebox"
  }
}

resource "azurerm_network_interface" "acebox-nic" {
  name                = "acebox-nic"
  location            = var.azure_location
  resource_group_name = azurerm_resource_group.rg.name

  ip_configuration {
    name                          = "ipconfig1"
    subnet_id                     = azurerm_subnet.ace-box_subnet.id
    private_ip_address_allocation = "Dynamic"
    public_ip_address_id          = azurerm_public_ip.acebox_publicip.id
  }
  tags = {
    environment = "acebox"
  }
}

resource "azurerm_network_interface_security_group_association" "acebox-nic-nsg" {
  network_interface_id      = azurerm_network_interface.acebox-nic.id
  network_security_group_id = azurerm_network_security_group.acebox_nsg.id
}

resource "azurerm_network_security_group" "acebox_nsg" {
  name                = "acebox-nsg"
  location            = var.azure_location
  resource_group_name = azurerm_resource_group.rg.name

  security_rule {
    name                       = "SSH"
    priority                   = 1001
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "22"
    source_address_prefix      = "*"
    destination_address_prefix = "*"
  }
  security_rule {
    name                       = "HTTP"
    priority                   = 1002
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "80"
    source_address_prefix      = "*"
    destination_address_prefix = "*"
  }
  security_rule {
    name                       = "HTTPS"
    priority                   = 1003
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "443"
    source_address_prefix      = "*"
    destination_address_prefix = "*"
  }

  tags = {
    environment = "acebox"
  }
}

# SSH key
module "ssh_key" {
  source = "../modules/ssh"
}

resource "azurerm_linux_virtual_machine" "acebox" {
  name                  = "ace-box"
  location              = var.azure_location
  resource_group_name   = azurerm_resource_group.rg.name
  network_interface_ids = [azurerm_network_interface.acebox-nic.id]
  size                  = var.azure_instance_size
  admin_username        = var.acebox_user

  admin_ssh_key {
    username   = var.acebox_user
    public_key = module.ssh_key.public_key_openssh
  }

  source_image_reference {
    publisher = var.acebox_os_azure.publisher
    offer     = var.acebox_os_azure.offer
    sku       = var.acebox_os_azure.sku
    version   = var.acebox_os_azure.version
  }

  os_disk {
    caching              = "ReadWrite"
    storage_account_type = "StandardSSD_LRS"
    disk_size_gb         = var.disk_size
  }

  tags = {
    environment = "acebox"
  }
}

#
# Dashboard Password
#
locals {
  generate_random_password = var.dashboard_password == ""
  dashboard_password       = coalescelist(random_password.dashboard_password[*].result, [var.dashboard_password])[0]
}

resource "random_password" "dashboard_password" {
  count  = local.generate_random_password ? 1 : 0
  length = 12
}

#
# Provisioner
#
locals {
  ingress_domain = local.is_custom_domain ? local.custom_domain : "${azurerm_public_ip.acebox_publicip.ip_address}.nip.io"
}

module "provisioner" {
  source = "../modules/ace-box-provisioner"

  host               = azurerm_public_ip.acebox_publicip.ip_address
  user               = var.acebox_user
  private_key        = module.ssh_key.private_key_pem
  ingress_domain     = local.ingress_domain
  ingress_protocol   = var.ingress_protocol
  dt_tenant          = var.dt_tenant
  dt_api_token       = var.dt_api_token
  use_case           = var.use_case
  extra_vars         = var.extra_vars
  dashboard_user     = var.dashboard_user
  dashboard_password = local.dashboard_password
  otel_export_enable = var.otel_export_enable
}