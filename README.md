# cypress-template

Plantilla base para proyectos E2E con Cypress + TypeScript.

## Objetivo

Este repositorio acelera el arranque de pruebas E2E con una configuración con:

- Ejemplo básico de localizadores,
- Ejemplo de logoin y manejo de sesión,
- Scripts de ejecución local y en CI,
- Configuración de reporter JUnit,
- Manejo de videos, screenshots y descargas,
- Variables de entorno nativas de Cypress,
- Configuración de TypeScript y linting,

## Instalación

```bash
npm install
```

## Scripts disponibles

- `npm run cy:verify`: verifica la instalación de Cypress.
- `npm run cy:open:electron`: abre Cypress en modo interactivo con Electron.
- `npm run cy:open:chrome`: abre Cypress en modo interactivo con Chrome.
- `npm run cy:run`: ejecuta pruebas E2E en modo headless.
- `npm run cy:run:record`: ejecuta pruebas con `--record` (si usas Cypress Cloud).
- `npm run type:check`: validación de tipos TypeScript sin generar salida.

## Variables de entorno

Se usan variables en `cypress.env.json` porque:

- es nativo de Cypress,
- no requiere `dotenv`,
- no obliga a declarar variables en `cypress.config.ts`,
- en pipelines se pueden sobreescribir desde el SO con el prefijo `CYPRESS_`.

Ejemplo de `cypress.env.json`:

```json
{
  "BASE_URL": "https://example.cypress.io",
  "USERNAME": "abc",
  "PASSWORD": "123"
}
```

> Nota: `BASE_URL` se toma desde `config.env.BASE_URL` en `cypress.config.ts` para facilitar el manejo de entornos diferentes en local vs pipeline.

## Filosofía de diseño de pruebas

Aunque el patrón de Page Object viene de Selenium, no suele ser la opción más alineada con Cypress.

Para Cypress, se recomienda priorizar:

- pruebas independientes y legibles.
- comandos personalizados,
- utilidades pequeñas,

Esto reduce acoplamiento y hace los tests más rápidos de mantener con AI.

## Estructura del proyecto

```text
.
+-- cypress/
|   +-- e2e/                 # specs E2E
|   +-- fixtures/            # datos estaticos de prueba
|   +-- support/
|       +-- commands.ts      # comandos personalizados
|       +-- e2e.ts           # hooks/config global del soporte
+-- cypress.config.ts        # configuracion de Cypress
+-- cypress.env.json         # variables de entorno del proyecto
+-- tsconfig.json            # configuracion de TypeScript
```

## Reportes y artefactos

La configuración actual genera:

- JUnit XML en `cypress/reports/junit/`
- videos en `cypress/reports/videos/`
- screenshots en `cypress/reports/screenshots/`
- descargas en `cypress/reports/downloads/`

Además, si un spec pasa sin fallos ni reintentos fallidos, su video se elimina automáticamente para ahorrar espacio.

## Cypress AI

Las herramientas de Cypress AI permiten acelerar la creación y mantenimiento de pruebas E2E con inteligencia artificial.

### Skills

- `cypress-author`: para crear, actualizar y corregir pruebas Cypress.
- `cypress-explain`: para explicar o revisar pruebas existentes.
- `cypress-docs`: para consultar documentación oficial de Cypress con mayor precisión.
