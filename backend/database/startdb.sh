#!/bin/bash

# Eliminar contenedor si existe
docker rm -f chambritas-db

# Limpiar volúmenes no usados
docker volume prune -f

# Construir la imagen desde el Dockerfile actual
docker build -t chambritas-db .

# Ejecutar el contenedor en background con el puerto mapeado
docker run -d -p 54321:5432 --name chambritas-db chambritas-db

echo "Contenedor chambritas-db iniciado en el puerto 54321"
