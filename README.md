# Sistema de Gestión de Cine (TAW-251)

API REST desarrollada para el **Sistema de Gestión de Cine** utilizando **NestJS** (modo ESM), **TypeORM** y **PostgreSQL**, con validación de datos mediante DTOs, reglas de negocio en servicios, borrado lógico (`@DeleteDateColumn`), autenticación con **JWT** (`bcrypt`, `JwtAuthGuard`, `addBearerAuth`)[cite: 1] y documentación interactiva en **Scalar** (`/docs`).

---

## Tabla de Contenidos

1. [Arquitectura y Stack Tecnológico](#arquitectura-y-stack-tecnológico)
2. [Entidades y Reglas de Negocio](#entidades-y-reglas-de-negocio)
3. [Autenticación y Seguridad JWT (Extra)](#autenticación-y-seguridad-jwt-extra)
4. [Requisitos e Instalación](#requisitos-e-instalación)
5. [Configuración de Variables de Entorno (.env)](#configuración-de-variables-de-entorno-env)
6. [Cómo Iniciar el Proyecto](#cómo-iniciar-el-proyecto)
7. [Evidencias y Capturas](#evidencias-y-capturas)

---

## Arquitectura y Stack Tecnológico

- **Runtime & Lenguaje:** Node.js + TypeScript (ESM)
- **Framework Backend:** NestJS
- **ORM:** TypeORM
- **Base de Datos:** PostgreSQL (`sistema_cine_taw`)
- **Validación:** `class-validator` y `class-transformer` con `ValidationPipe` global
- **Autenticación JWT:** `@nestjs/jwt`, `bcrypt`, Guard global (`JwtAuthGuard`) y `addBearerAuth()` en OpenAPI/Scalar[cite: 1]
- **Documentación API:** Scalar UI en `http://localhost:3000/docs`

---

## Entidades y Reglas de Negocio

El modelo está compuesto por **7 entidades** con borrado lógico (`@DeleteDateColumn`) para mantener el historial sin borrar registros físicamente:

1. **`Salas`:** gestión de salas de cine y su capacidad.
2. **`Generos`:** catálogo de géneros cinematográficos.
3. **`Peliculas`:** registro de películas y relación con géneros.
4. **`Clientes`:** registro y consulta de clientes.
5. **`Funciones`:** programación de películas en salas, horarios y precio base.
6. **`Boletos`:** venta/registro de boletos con validación de rango de asiento según la capacidad de la sala, unicidad de asiento por función y asignación automática del precio de la función si no se especifica.
7. **`Usuario`:** entidad para autenticación con `idUsuario` (PK), `username`, `email` (único), `password` (hasheada con `bcrypt`), `creadoEn`, `actualizadoEn` y `eliminadoEn`[cite: 1].

---

## Autenticación y Seguridad JWT (Extra)

- **`POST /auth/register`:** registra un nuevo usuario guardando la contraseña encriptada con `bcrypt`[cite: 1].
- **`POST /auth/login`:** inicia sesión y devuelve un `access_token` (JWT)[cite: 1].
- **Guard (`JwtAuthGuard`):** protege los endpoints **`POST`**, **`PATCH`** y **`DELETE`** devolviendo **`401 Unauthorized`** si no se envía token o no es válido; los **`GET`** permanecen públicos[cite: 1].
- **Scalar (`addBearerAuth`):** permite ingresar el `Bearer` token directamente en la documentación interactiva para probar rutas protegidas[cite: 1].

---

## Requisitos e Instalación

1. Tener instalado **Node.js** y **PostgreSQL** en ejecución.
2. Clonar o descargar el repositorio y entrar a la carpeta del proyecto:

```bash
git clone [https://github.com/JOSSEL01/sistema-cine-taw.git](https://github.com/JOSSEL01/sistema-cine-taw.git)
cd sistema-cine-taw
```

3. Instalar las dependencias del proyecto:

```bash
npm install
```

---

## Configuración de Variables de Entorno (.env)

Crea un archivo `.env` en la raíz del proyecto (puedes guiarte con `.env.example` si existe) y configura tus credenciales:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=tu_password_de_postgres
DB_DATABASE=sistema_cine_taw
JWT_SECRET=clave_secreta_super_segura_taw251
JWT_EXPIRES_IN=1d
```

Asegúrate de que la base de datos `sistema_cine_taw` exista en PostgreSQL antes de arrancar la aplicación.

---

## Cómo Iniciar el Proyecto

### Modo desarrollo (recomendado, con recarga automática)
```bash
npm run start:dev
```

### Compilar y ejecutar en producción
```bash
npm run build
npm run start:prod
```

Una vez que la consola indique que el servidor está corriendo:
- **API Base:** `http://localhost:3000`
- **Documentación Interactiva (Scalar):** `http://localhost:3000/docs`

---

## Evidencias y Capturas

> Nota: Si guardaste tus imágenes dentro de una carpeta (por ejemplo `docs/capturas/`), agrega ese prefijo a la ruta de cada imagen, por ejemplo `docs/capturas/12-post-auth-register-201.png`.

### Borrado Lógico (Soft Delete) y Base de Datos
![Soft Delete en pgAdmin](11-pgadmin-soft-delete.png)[cite: 2]

### Extra — Autenticación con JWT

#### 1. Registro de usuario (`POST /auth/register` → `201 Created`)
![POST Auth Register 201](12-post-auth-register-201.png)[cite: 2]

#### 2. Inicio de sesión y obtención de `access_token` (`POST /auth/login`)
![POST Auth Login Token](13-post-auth-login-token.png)[cite: 2]

#### 3. Acceso denegado sin token (`401 Unauthorized`)
![Error 401 sin token](14-error-401-sin-token.png)[cite: 2]

#### 4. Petición protegida exitosa con `Bearer` token en Scalar
![Petición autorizada con Bearer](15-auth-bearer-exito.png)[cite: 2]