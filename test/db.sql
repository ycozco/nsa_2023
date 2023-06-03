-- Tabla: DistritoFiscal
CREATE TABLE DistritoFiscal (
  id INT PRIMARY KEY,
  nombre VARCHAR(255)
);

-- Tabla: Dependencias
CREATE TABLE Dependencias (
  id INT PRIMARY KEY,
  nombre VARCHAR(255),
  atributo1 VARCHAR(255),
  id_distrito INT,
  FOREIGN KEY (id_distrito) REFERENCES DistritoFiscal(id)
);

-- Tabla: Sede
CREATE TABLE Sede (
  id INT PRIMARY KEY,
  direccion VARCHAR(255),
  tipo_sede_id INT,
  servicios VARCHAR(255),
  dependencias INT,
  FOREIGN KEY (dependencias) REFERENCES Dependencias(id),
  FOREIGN KEY (tipo_sede_id) REFERENCES TipoSede(id)
);

-- Tabla: TipoSede
CREATE TABLE TipoSede (
  id INT PRIMARY KEY,
  nombre VARCHAR(255)
);

-- Tabla: Servicios
CREATE TABLE Servicios (
  id INT PRIMARY KEY,
  continuidadServicio VARCHAR(255)
);

-- Tabla: Conectividad
CREATE TABLE Conectividad (
  id INT PRIMARY KEY,
  id_servicio INT,
  FOREIGN KEY (id_servicio) REFERENCES Servicios(id)
);

-- Tabla: FluidoElectrico
CREATE TABLE FluidoElectrico (
  id INT PRIMARY KEY,
  id_servicio INT,
  FOREIGN KEY (id_servicio) REFERENCES Servicios(id)
);

-- Tabla: Fiscalia
CREATE TABLE Fiscalia (
  id INT PRIMARY KEY,
  categoria VARCHAR(255),
  id_despacho INT,
  FOREIGN KEY (id_despacho) REFERENCES Despacho(id)
);

-- Tabla: Despacho
CREATE TABLE Despacho (
  id INT PRIMARY KEY,
  id_tipo_fiscalia INT,
  FOREIGN KEY (id_tipo_fiscalia) REFERENCES TipoFiscalia(id)
);

-- Tabla: TipoFiscalia
CREATE TABLE TipoFiscalia (
  id INT PRIMARY KEY,
  nombre VARCHAR(255)
);
