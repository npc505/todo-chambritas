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


INSERT INTO productos (nombre, marca, codigo_color, calificacion, descripcion, precio, stock, fibra, grosor, peso, largo, calibre, agujas_sugeridas, ganchos_sugeridos, porcentaje_descuento, imagen_dir) VALUES
('Hilo de algodón', 'CottonSoft', '#FF5733', 4.5, 'Hilo suave ideal para verano', 45.00, 120, '100% algodón', 'FINO', 50.0, 150.0, 3, 2.5, 3.0, 10.0, 'imagenes/algodon_1.jpg'),
('Lana merino', 'WoollyWorld', '#8D33FF', 4.9, 'Lana de oveja merino, cálida y ligera', 95.00, 80, '100% merino', 'MEDIO', 100.0, 120.0, 5, 4.5, 5.0, 5.0, 'imagenes/merino_1.jpg'),
('Hilo de bambú', 'BambooThreads', '#33FF57', 4.2, 'Ecológico y sedoso al tacto', 60.50, 200, '70% bambú, 30% algodón', 'FINO', 60.0, 140.0, 4, 3.0, 3.5, 0, 'imagenes/bambu_1.jpg'),
('Lana gruesa', 'ChunkyYarns', '#FF3380', 4.8, 'Ideal para mantas y bufandas gruesas', 75.99, 50, '80% acrílico, 20% lana', 'GRUESO', 150.0, 100.0, 8, 8.0, 9.0, 15.0, 'imagenes/lana_gruesa.jpg'),
('Hilo de lino', 'LinoNatural', '#FFD133', 3.9, 'Textura rústica, perfecto para verano', 49.99, 90, '100% lino', 'MEDIO', 80.0, 130.0, 3, 3.5, 4.0, 0, 'imagenes/lino_1.jpg'),
('Hilo metálico', 'ShinyTouch', '#D4AF37', 4.1, 'Brillante para detalles decorativos', 35.00, 150, 'Poliéster metalizado', 'FINO', 30.0, 90.0, 2, 1.5, 2.0, 0, 'imagenes/metalico_1.jpg'),
('Lana alpaca', 'AlpacaSoft', '#A0522D', 4.7, 'Extremadamente suave y cálida', 110.00, 40, '100% alpaca', 'MEDIO', 120.0, 110.0, 6, 5.0, 5.5, 8.0, 'imagenes/alpaca_1.jpg'),
('Hilo multicolor', 'ColorMix', '#FF33C1', 4.3, 'Cambia de color a lo largo del hilo', 55.25, 75, '50% algodón, 50% acrílico', 'MEDIO', 70.0, 130.0, 4, 3.0, 4.0, 5.0, 'imagenes/multicolor_1.jpg'),
('Hilo reciclado', 'EcoFiber', '#3399FF', 4.0, 'Hecho de fibras recicladas', 39.99, 180, 'Algodón reciclado', 'MEDIO', 80.0, 120.0, 4, 3.5, 3.5, 0, 'imagenes/ecofiber_1.jpg'),
('Lana teñida a mano', 'HandDyeCo', '#9933FF', 5.0, 'Colores únicos, teñido artesanal', 125.00, 20, 'Lana de oveja', 'MEDIO', 100.0, 130.0, 5, 5.5, 5.5, 0, 'imagenes/handdye_1.jpg'),
('Hilo de seda', 'SilkLine', '#F0E68C', 4.6, 'Lujo y brillo natural', 150.00, 25, '100% seda natural', 'FINO', 40.0, 180.0, 2, 2.0, 2.5, 0, 'imagenes/seda_1.jpg'),
('Lana gruesa especial', 'MegaChunk', '#FF6347', 4.4, 'Para proyectos rápidos y cálidos', 70.00, 60, 'Acrílico', 'GRUESO', 200.0, 90.0, 10, 9.0, 10.0, 10.0, 'imagenes/megachunk_1.jpg'),
('Hilo infantil', 'SoftBaby', '#ADD8E6', 4.8, 'Especial para prendas de bebé', 40.00, 130, 'Acrílico hipoalergénico', 'FINO', 60.0, 140.0, 3, 2.5, 3.0, 0, 'imagenes/baby_1.jpg'),
('Lana con brillo', 'SparkleWool', '#C71585', 4.3, 'Lana con toques brillantes', 85.00, 70, 'Lana y poliéster brillante', 'MEDIO', 90.0, 110.0, 5, 4.5, 5.0, 0, 'imagenes/sparkle_1.jpg'),
('Hilo deportivo', 'SportYarn', '#228B22', 4.0, 'Duradero y flexible', 55.00, 100, 'Acrílico y nylon', 'MEDIO', 85.0, 130.0, 5, 4.0, 4.5, 0, 'imagenes/sport_1.jpg'),
('Lana básica', 'BasicWool', '#8B0000', 3.8, 'Económica para principiantes', 30.00, 300, '100% acrílico', 'MEDIO', 80.0, 120.0, 4, 3.5, 4.0, 0, 'imagenes/basic_1.jpg'),
('Hilo elástico', 'FlexiYarn', '#00CED1', 4.2, 'Ideal para prendas ajustadas', 48.00, 95, 'Mezcla con spandex', 'FINO', 55.0, 140.0, 3, 3.0, 3.5, 0, 'imagenes/flexi_1.jpg'),
('Lana premium', 'EliteWool', '#191970', 4.9, 'Suavidad y calidad premium', 135.00, 35, 'Lana merino premium', 'MEDIO', 110.0, 125.0, 5, 5.0, 5.0, 0, 'imagenes/elite_1.jpg'),
('Hilo navideño', 'FestiveThread', '#B22222', 4.5, 'Colores ideales para fiestas', 65.00, 70, 'Mezcla especial navideña', 'MEDIO', 75.0, 100.0, 4, 4.0, 4.0, 20.0, 'imagenes/navidad_1.jpg'),
('Lana sin teñir', 'RawWool', '#F5F5DC', 4.1, 'Natural, sin colorantes', 58.00, 50, '100% lana cruda', 'MEDIO', 100.0, 120.0, 5, 4.5, 4.5, 0, 'imagenes/raw_1.jpg');


INSERT INTO usuarios (
  nombre, 
  apellido_paterno, 
  correo, 
  contraseña, 
  celular
) VALUES (
  'Ana',
  'López',
  'ana.lopez@example.com',
  '$2a$08$tDAiXZg6m1.6NZ1mHfHuIumfjzf5xhjw0x8.nkmfz40fOn8ONCdv6', -- hash de "password" con cost 8
  '555-987-6543'
);
