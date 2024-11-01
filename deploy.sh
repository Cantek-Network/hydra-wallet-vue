#!/bin/bash

# Function to check if nvm is installed
check_nvm_installed() {
  if [ -z "$NVM_DIR" ]; then
    NVM_DIR="$HOME/.nvm"
  fi

  if [ ! -s "$NVM_DIR/nvm.sh" ]; then
    echo "NVM is not installed. Please install NVM by following the instructions at https://github.com/nvm-sh/nvm"
    exit 1
  else
    # Source NVM script to use it in the shell
    echo "NVM is installed. Loading NVM..."
    source "$NVM_DIR/nvm.sh"
  fi
}

# Function to use Node.js version from .nvmrc
use_node_version_from_nvmrc() {
  if [ -f ".nvmrc" ]; then
    echo "Found .nvmrc file. Switching to the Node.js version specified in .nvmrc..."
    
    # Read the Node.js version from .nvmrc
    NODE_VERSION=$(cat .nvmrc)
    nvm install $NODE_VERSION
  else
    DEFAULR_NODE_VERSION="20.15.1"
    echo ".nvmrc file not found. Using default Node.js version: $DEFAULR_NODE_VERSION"
    nvm install $DEFAULR_NODE_VERSION
  fi
}

# Function to check if pm2 is installed
check_pm2_installed() {
  if ! command -v pm2 &> /dev/null
  then
    echo "PM2 is not installed. Installing PM2 globally..."
    npm install -g pm2
  else
    echo "PM2 is already installed. Version: $(pm2 -v)"
  fi
}

# Function to check if the PM2 service exists and delete it if it does

check_and_delete_pm2_service() {
  local service_name=$1
  if pm2 list | grep -q "$service_name"; then
    echo "PM2 service '$service_name' already exists. Deleting it..."
    pm2 delete "$service_name"
  else
    echo "PM2 service '$service_name' does not exist."
  fi
}

# Main script execution

# Step 1: Check if NVM is installed and load it
check_nvm_installed

# Step 2: Use the Node.js version specified in .nvmrc
use_node_version_from_nvmrc


# Step 3: Run pnpm install and pnpm run build
echo "Install pnpm globally..."
npm install -g pnpm
echo "Running pnpm install..."
pnpm install

echo "Running pnpm run build..."
pnpm run build


# Step 4: Check if PM2 is installed, if not install it
check_pm2_installed

# Step 5: Check if the PM2 service exists and delete it if it does
service_name="hydra-wallet-client"
check_and_delete_pm2_service $service_name

# Serve the dist folder with PM2
echo "Serving the app with PM2..."
pm2 serve ./dist 3000 --spa --name $service_name
