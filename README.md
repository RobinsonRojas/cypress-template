# cypress-template

Plantilla base para proyectos E2E con Cypress + TypeScript.

## Objetivo

Este repositorio acelera el arranque de pruebas E2E con una configuración que incluye:

- Ejemplo básico de localizadores,
- Ejemplos de login y manejo de sesión,
- Scripts de ejecución local y en CI,
- Configuración de pipeline en Azure DevOps,
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

Para Cypress, se recomienda priorizar:

- Pruebas independientes y **legibles**.
- Menos abstracción.
- Comandos personalizados.
- Utilidades pequeñas.
- BDD con Mocha

Esto reduce el acoplamiento y hace las pruebas más rápidas de escribir y mantener con AI.

### Por qué no utilizar Page Object

En Cypress, un POM clásico suele duplicar abstracciones que ya cubren los comandos nativos. Preferimos comandos personalizados y utilidades pequeñas para mantener pruebas más directas, legibles y fáciles de ajustar.

Cuando un Page Object encapsula estado o guarda referencias de elementos, esas referencias pueden quedar obsoletas tras un re-render del DOM, lo que incrementa la flakiness. Cypress es más estable cuando cada interacción reconsulta el DOM con comandos encadenados y aserciones, en lugar de reutilizar objetos de página con estado.

> Doc: <https://docs.cypress.io/app/core-concepts/best-practices#Organizing-Tests-Logging-In-Controlling-State>

### BDD sin Cucumber

Cucumber agrega una capa extra entre la prueba y la aplicación: hay que crear y mantener definiciones de pasos antes de probar valor real. Esto aumenta el costo de mantenimiento y hace más lenta la escritura de pruebas.

Además, Cypress ya ofrece BDD con la interfaz de estructura de pruebas Mocha y comandos orientados al comportamiento del usuario, ya que la mayoría de los comandos se leen como una frase sin añadir una capa adicional de abstracción.

> Doc: <https://docs.cypress.io/app/references/bundled-libraries#Mocha>, <https://mochajs.org/interfaces/bdd/>

## Estructura del proyecto

```text
.
+-- cypress/
|   +-- e2e/                 # specs E2E
|   +-- fixtures/            # datos estáticos de prueba
|   +-- support/
|       +-- commands.ts      # comandos personalizados
|       +-- e2e.ts           # hooks/config global del soporte
+-- cypress.config.ts        # configuración de Cypress
+-- cypress.env.json         # variables de entorno del proyecto
+-- tsconfig.json            # configuración de TypeScript
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

Habilidades oficiales proporcionadas por Cypress

- `cypress-author`: para crear, actualizar y corregir pruebas Cypress.
- `cypress-explain`: para explicar o revisar pruebas existentes.
- `cypress-docs`: para consultar documentación oficial de Cypress con mayor precisión.

### MCP

Servidores MCP oficales y recomendados de forma oficial por Cypress.

- `chrome-devtools-mcp`: Conecta tu agente con Cypress app conectado a tu sesión de Cypress, el agente tiene acceso en tiempo real a:
  - **Estado de prueba/fallo y mensajes de error** — consultados directamente desde el runner en vivo, no retransmitidos por ti
  - **Estado del DOM en el punto de fallo** — cómo era realmente la aplicación, no una descripción de ella
  - **Registros de consola y datos de solicitudes de red** — útiles para diagnosticar fallos que no tengan que ver únicamente con selectores o aserciones
  - **Registros de comandos de Cypress** — la secuencia completa de lo que se ejecutó antes del fallo

  Además, puedes señalar a tu agente los activos a los que ya tiene acceso, como capturas de pantalla de fallos, tu código local y tu historial de git. Juntos, eso le da todo lo necesario para determinar si la prueba o la app necesita cambiar.

  > Doc:<https://www.cypress.io/blog/connect-an-ai-agent-to-a-live-cypress-test-session>

- `cypress-cloud-mcp`:

  > Doc:<https://docs.cypress.io/cloud/integrations/cloud-mcp>

### Cypress CLI

Cyrpress CLI es una apliucacion de terminal pensada para ser utilizada por agentes de ia para coansultare informacion de cypress-cloud sobre las ejecucion de pruebas y dotar de contexto a los agentes

- `cypress-cloud-cli`:

  > Doc:<https://docs.cypress.io/cloud/integrations/cloud-cli>
