#!/bin/sh

echo "Criando banco..."

python seed.py

echo "Iniciando API..."

python run.py