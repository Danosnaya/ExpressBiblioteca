-- Database: biblioteca

--DROP DATABASE biblioteca;

--CREATE DATABASE biblioteca;
--DROP TABLE editorial CASCADE;

CREATE TABLE editorial
(
  id integer NOT NULL,
  nombre varchar(50),
  CONSTRAINT PK_editorial PRIMARY KEY (id)
);

--DROP TABLE libros CASCADE;

CREATE TABLE libros
(
  isbn varchar(50) NOT NULL,
  titulo varchar(50),
  resumen text,
  numpaginas integer,
  editorial_id integer,
  CONSTRAINT PK_libros PRIMARY KEY (isbn),
  CONSTRAINT FK_libros_editorial_id FOREIGN KEY (editorial_id)
      REFERENCES editorial (id) 
      ON UPDATE CASCADE ON DELETE CASCADE
);

--DROP TABLE personas CASCADE;

CREATE TABLE personas
(
  curp varchar(50) NOT NULL,
  nombre varchar(50),
  apellido_paterno varchar(50),
  apellido_materno varchar(50),
  fecha_nacimiento varchar(50),
  CONSTRAINT PK_personas_CURP PRIMARY KEY (curp)
);

--DROP TABLE autores CASCADE;

CREATE TABLE autores
(
  id integer NOT NULL,
  persona_curp varchar(50),
  fechapubl varchar(50),
  bibliografia text,
  CONSTRAINT PK_autores_ID PRIMARY KEY (id),
  CONSTRAINT FK_autores_persona_CURP FOREIGN KEY (persona_curp)
      REFERENCES personas (curp)
      ON UPDATE CASCADE ON DELETE CASCADE
);

--DROP TABLE libros_autores CASCADE;

CREATE TABLE libros_autores
(
  id integer NOT NULL,
  autor_id integer,
  libros_id varchar(50),
  CONSTRAINT PK_libros_autores_idL PRIMARY KEY (id),
  CONSTRAINT FK_libros_autores_Autor_ID FOREIGN KEY (autor_id)
      REFERENCES autores (id) 
      ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT FK_libros_autores_Libros_id FOREIGN KEY (libros_id)
      REFERENCES libros (isbn) 
      ON UPDATE CASCADE ON DELETE CASCADE
);


  