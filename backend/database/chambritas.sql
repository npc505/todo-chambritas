DROP TABLE IF EXISTS carrito_de_compras CASCADE;
DROP TABLE IF EXISTS productos CASCADE;
DROP TABLE IF EXISTS usuarios CASCADE;

CREATE TYPE grosor_enum AS ENUM ('FINO', 'MEDIO', 'GRUESO');

CREATE TABLE usuarios (
  usuario_id SERIAL PRIMARY KEY,
  nombre VARCHAR(120) NOT NULL,
  apellido_paterno VARCHAR(120) NOT NULL,
  apellido_materno VARCHAR(120) NOT NULL,
  correo VARCHAR(120) NOT NULL UNIQUE,
  contraseña CHAR(64) NOT NULL,
  celular VARCHAR(30) NOT NULL,
  fecha_registro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  activo BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE productos (
  producto_id SERIAL PRIMARY KEY,
  nombre VARCHAR(120) NOT NULL,
  calificacion DECIMAL(2,1),
  marca VARCHAR(120) NOT NULL,
  codigo_color VARCHAR(6) NOT NULL,
  descripcion VARCHAR(500),
  precio DECIMAL(10,2) NOT NULL,
  stock INTEGER NOT NULL,
  fibra VARCHAR(100),
  grosor grosor_enum,
  peso DECIMAL(10,2),
  largo DECIMAL(10,2),
  calibre INTEGER,
  agujas_sugeridas DECIMAL(5,2),
  ganchos_sugeridos DECIMAL(5,2),
  porcentaje_descuento DECIMAL(5,2),
  imagen_dir VARCHAR(255) NOT NULL
);

CREATE TABLE carrito_de_compras (
  usuario_id INTEGER NOT NULL,
  producto_id INTEGER NOT NULL,
  cantidad INTEGER NOT NULL,
  PRIMARY KEY (usuario_id, producto_id),
  FOREIGN KEY (usuario_id) REFERENCES usuarios (usuario_id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (producto_id) REFERENCES productos (producto_id) ON DELETE CASCADE ON UPDATE CASCADE
);
