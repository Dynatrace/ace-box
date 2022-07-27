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

locals {
  ingress_domain = local.is_custom_domain ? local.custom_domain : "${azurerm_public_ip.acebox_publicip.ip_address}.nip.io"
}

# Provision ACE-Box
module "provisioner" {
  source = "../modules/ace-box-provisioner"

  host             = azurerm_public_ip.acebox_publicip.ip_address
  user             = var.acebox_user
  private_key      = module.ssh_key.private_key_pem
  ingress_domain   = local.ingress_domain
  ingress_protocol = var.ingress_protocol
  dt_tenant        = var.dt_tenant
  dt_api_token     = var.dt_api_token
  dt_paas_token    = var.dt_paas_token
  ca_tenant        = var.ca_tenant
  ca_api_token     = var.ca_api_token
  use_case         = var.use_case
}