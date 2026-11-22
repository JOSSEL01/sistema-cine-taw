# Sistema de Gestión de Cine (TAW-251)

API REST desarrollada con **NestJS** (modo ESM), **TypeORM** y **PostgreSQL**, con validación de datos mediante `class-validator`, borrado lógico (`@DeleteDateColumn`) y documentación interactiva en **Scalar** (`/docs`).

---

## Stack tecnológico

- **Framework:** NestJS (TypeScript / ESM `nodenext`)
- **Base de datos y ORM:** PostgreSQL (`sistema_cine_taw`) + TypeORM
- **Validación y transformación:** `class-validator` y `class-transformer`
- **Documentación API:** Scalar (`/docs`)

---

## Arquitectura de datos (7 tablas)

El modelo relacional está compuesto por 7 tablas gestionadas con TypeORM:

1. **`salas`**: salas de cine (`2D`, `3D`, `IMAX`) y su `capacidad` máxima.
2. **`generos`**: géneros cinematográficos (`nombre`, `descripcion`).
3. **`peliculas`**: catálogo de películas (`titulo`, `sinopsis`, `duracionMin`, `clasificacion`: `ATP` | `+13` | `+18`).
4. **`pelicula_genero`**: tabla intermedia de relación muchos-a-muchos entre `peliculas` y `generos`.
5. **`clientes`**: registro de clientes (`nombres`, `paterno`, `materno`, `email`).
6. **`funciones`**: programación de películas en salas (`idSala`, `idPelicula`, `fechaHora`, `precio`).
7. **`boletos`**: emisión de boletos (`idFuncion`, `idCliente`, `numeroAsiento`, `precioPagado`).

Todas las entidades principales incluyen marcas de auditoría (`creadoEn`, `actualizadoEn`) y **borrado lógico** (`eliminadoEn` vía `@DeleteDateColumn`).

---

## Módulos y endpoints principales

- **`/salas`**: `POST`, `GET`, `GET /:id`, `PATCH /:id`, `DELETE /:id`
- **`/generos`**: `POST`, `GET`, `GET /:id`, `PATCH /:id`, `DELETE /:id`
- **`/peliculas`**: `POST`, `GET`, `GET /:id`, `PATCH /:id`, `DELETE /:id`, `POST /:id/generos/:generoId`, `DELETE /:id/generos/:generoId`
- **`/clientes`**: `POST`, `GET`, `GET /:id`, `PATCH /:id`, `DELETE /:id`
- **`/funciones`**: `POST`, `GET`, `GET /:id`, `PATCH /:id`, `DELETE /:id`
- **`/boletos`**: `POST`, `GET`, `GET /:id`, `PATCH /:id`, `DELETE /:id`

---

## Reglas de negocio y manejo de errores

- **Integridad relacional (`404 Not Found`):** valida la existencia de salas, películas, géneros, clientes y funciones antes de crear, actualizar o asociar registros.
- **Rango de asientos (`400 Bad Request`):** el `numeroAsiento` de un boleto debe encontrarse entre `1` y la `capacidad` de la sala asociada a la función.
- **Asiento único por función (`400 Bad Request`):** impide vender dos boletos activos con el mismo `numeroAsiento` para la misma función.
- **Precio por defecto:** si no se especifica `precioPagado` al crear un boleto, se asigna automáticamente el `precio` de la función.
- **Borrado lógico (`200 OK`):** los `DELETE` marcan `eliminadoEn` sin eliminar físicamente el registro de PostgreSQL.

---

## Instalación y puesta en marcha

### 1. Instalar dependencias
```bash
npm install