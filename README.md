# UPTC FIT 🏋️‍♂️

Una plataforma web para la gestión de turnos y usuarios del Centro de Acondicionamiento Físico (CAF) de la UPTC sede central.

## Tabla de Contenidos
- [Características](#características)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Ejecución](#ejecución)
- [Tecnologías](#tecnologías)
- [Autores](#autores)
- [Licencia](#licencia)

## Características

- Autenticación segura con Clerk
- Gestión de roles (Administrador, Empleado, Estudiante)
- Sistema de agendamiento de turnos
- Panel administrativo
- Gestión de usuarios y estados
- Soporte para diferentes tipos de estamentos universitarios
- Base de datos MySQL con Prisma ORM

## Instalación

### Requisitos Previos

- Node.js (v18 o superior)
- MySQL
- npm o yarn
- Cuenta en Clerk

### Pasos de Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/lunna21/FIT_UPTC.git
cd FIT_UPTC
```

2. Instalar dependencias:
```bash
npm install
```

## Configuración

### Base de Datos

1. Crear usuario y base de datos MySQL:
```bash
mysql -u root -p
CREATE USER 'fituser'@'localhost' IDENTIFIED BY 'fituser123';
CREATE DATABASE fituptc;
GRANT ALL PRIVILEGES ON fituptc.* TO 'fituser'@'localhost';
FLUSH PRIVILEGES;
```

2. Configurar variables de entorno:
```bash
# .env
DATABASE_URL="mysql://fituser:fituser123@localhost:3306/fituptc"
```

### Clerk Authentication

1. Configurar variables de entorno:
```bash
# .env.local
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=tu_publishable_key
CLERK_SECRET_KEY=tu_secret_key
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/register
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

2. Inicializar base de datos:
```bash
npx prisma db push
```

3. Ejecutar scripts de inicialización (disponibles en la sección de configuración inicial del proyecto)

## Ejecución

```bash
npm run dev
```
Acceder a http://localhost:3000

### Credenciales Iniciales
- Usuario: admin.super
- Contraseña: holaMundo.34
- Email: diegofernandoguirretenjo@gmail.com

## Tecnologías

- Next.js
- MySQL
- Prisma ORM
- Clerk Authentication
- TypeScript
- Tailwind CSS

## Autores

- Diego Aguirre
- Lunna Sosa
- Laura Vela

## Licencia

Este proyecto está bajo una licencia restringida como parte de un proyecto universitario de la UPTC. Todos los derechos reservados.