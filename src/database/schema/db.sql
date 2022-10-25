CREATE DATABASE rede_social;

CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    senha TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS postagens (
    id SERIAL PRIMARY KEY,
    id_usuario INTEGER NOT NULL,
    texto TEXT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuarios (id)
);
