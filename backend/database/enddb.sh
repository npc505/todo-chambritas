#!/bin/bash

docker rm -f chambritas-db 

docker volume prune -f   


echo "Contenedor chambritas-db destruido"