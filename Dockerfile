version: '3.8'
services:
  antgymdb:
    image: postgres:15.3
    ports:
      - 5432:5432
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: mysecretpassword
      POSTGRES_DB: postgres
    networks:
      - local
networks:
  local:

