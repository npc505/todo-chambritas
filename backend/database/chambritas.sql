DROP TABLE IF EXISTS carrito_de_compras CASCADE;
DROP TABLE IF EXISTS productos CASCADE;
DROP TABLE IF EXISTS usuarios CASCADE;

CREATE TYPE grosor_enum AS ENUM ('FINO', 'MEDIO', 'GRUESO');

CREATE TABLE usuarios (
  usuario_id SERIAL PRIMARY KEY, 
  nombre VARCHAR(120) NOT NULL, 
  apellido_paterno VARCHAR(120) NOT NULL,
  correo VARCHAR(120) NOT NULL UNIQUE, 
  contraseña CHAR(64) NOT NULL, 
  celular VARCHAR(30) NOT NULL,
  fecha_registro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  activo BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE productos (
  producto_id SERIAL PRIMARY KEY,

  nombre VARCHAR(120) NOT NULL,
  marca VARCHAR(120) NOT NULL,
  codigo_color VARCHAR(8) NOT NULL,

  -- Si quieres evitar productos duplicados por combinación de nombre + marca + color:
  CONSTRAINT productos_unicos UNIQUE (nombre, marca, codigo_color),

  calificacion DECIMAL(2,1) CHECK (calificacion >= 0 AND calificacion <= 5),

  descripcion VARCHAR(500),
  precio DECIMAL(10,2) NOT NULL CHECK (precio >= 0),
  stock INTEGER NOT NULL CHECK (stock >= 0),

  fibra VARCHAR(100),
  grosor grosor_enum,
  peso DECIMAL(10,2) CHECK (peso >= 0),
  largo DECIMAL(10,2) CHECK (largo >= 0),
  calibre INTEGER CHECK (calibre >= 0),
  agujas_sugeridas DECIMAL(5,2) CHECK (agujas_sugeridas >= 0),
  ganchos_sugeridos DECIMAL(5,2) CHECK (ganchos_sugeridos >= 0),
  porcentaje_descuento DECIMAL(5,2) DEFAULT 0 CHECK (porcentaje_descuento >= 0 AND porcentaje_descuento <= 100),
  
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
