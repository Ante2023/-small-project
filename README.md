# Creando proyecto typescript usando POO

## Creando enviromente de trabajo

Deberé completar **METADATA** del proyecto respondiendo un set de preguntas a npm sobre el proyecto. Si usamos flag -y, npm asignará valores predeterminados.</br>
<code>
npm init
</code>

## Instalando dependencias entorno locales (Obligatorias para Producción).

Estás se adjuntarán cuando empaquetemos el proyecto para producción. flag **"--save"** es opcional.</br>
<code>
npm install class-validator class-transformer cors dotenv express morgan mysql typeorm typeorm-naming-strategies typescript
</code>

- <span style="color: LightSteelBlue; font-weight:bold">Descripción:</span>
  - **class-validator:** Para crear validadores de clase sobre sus contenidos a travez de decoradores "@Date, @Email, @id. etc".
  - **cors:** Permite recibir peticones de otros servidores. Desbloquea el consumo de mis datos dese endpoints.
  - **dotenv:** Gestiona las variables de entorn desde fichero oculto.
  - **express:** Framework JS desarrollado sobre node (le provee todas sus funcionalidades), crear app web y APIs.
  - **morgan:** Permite visualizar (logger) la comunicación http desde consola (request/response).
  - **mysql:** Gestiona la comunicación entre express y la base de datos (SMDB).
  - **typeorm:** ORM de base de satos SQL, para gestionar la DB desde express sin acceder a la DB ni usar SQL.
  - **typeorm-naming-strategies:** Resuelve los cambios de nombres entre clases y relaciones en DB (si/no camel case).
  - **typescript:** Dependencia para usar typescrip en el código. Es un precompilador, fuertemente tipado, robusto y OObjetos

## Instalando dependencias entorno desarrollo

Estas permiten agilizar el desarrollo. Los flags "-D" o "--save-dev" son equivalentes. No se usan en producción.<br/>
<code>
npm install -D @types/cors @types/express @types/morgan concurrently nodemon
</code>

- <span style="color: LightSteelBlue; font-weight:bold">Descripción:</span>
  - **@types/cors:** Módulo typescript (no js) para usar cors, ofrece funcionalidades basadas en typescript. tipado
  - **@types/express:** Módulo typescript (no js) para usar express, permite tipar el request, response, etc
  - **@types/morgan:** Módulo typescript (no js) para usar morgan
  - **concurrently:** Permite ejecutar varios comandos en el script de package.json
  - **nodemon:** Reinicia automaticamente el servidor al detectar cambios en el fuente. Si silo uso node, debería reiniciar manualmente este servidor en cada cambio del fuente.

## Creando la configuración para typescript, comando "tsc" typescript compiler.

Si tenemos la instación de typescript global usamos `tsc --init`, de lo contrario `npx tsc --init`
Crea un tsconfig.json con una configuración por defecto de ts que podemos cambiar. </br>
<span style="color: LightSteelBlue; font-weight:bold">Descripción:</span>

- **tsconfig.json:** Contiene lo necesario para transpilar el fuente ts a ES6, usar ts en entorno node.
- **/dist:** Indica el directorio de salida de los files js y el directorio raiz donde se encuentra el fuente ts.
- **/rootDir:** Indica el contenido de typescript
- **/outDir:** Indica el destino de files convertidos de ts a js, están listos para producción.Yo creo muevo a ./dist
- **strict: true, "strictPropertyInitialization": true,** Habilita el tipado estricto
- **experimentalDecorators": true, "emitDecoratorMetadata": true** Para que en el ORM se gestione y configurenm los decoradores

## Levantando el servidor usando clases y typescript

Creamos desde package.json la configuración para exe la app

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start":"tsc && node dist/server.js",
    "start:dev":"tss && concurrently \"tsc -w\" \"nodemon dist/server.js\" "

}
```

<span style="color: LightSteelBlue; font-weight:bold">Explicación:</span>

Ejecutando script con nombres nativos de node <br>
`"start":"tsc && node dist/server.js"`

Como **"start:"** es una palabra nativa de node, no necesitanmos ponerle el run para ejecutar el escript. Pasos:

- 1º: tsc, transpila ts a js y envía a ./dist,
- && (y luego)
- exe desde dist este archivo server.js",

Ejecutando el programa desde server.js

```bash
/poo$ npm start

> proyecto-objetos@1.0.0 start
> tsc && node dist/server.js

Server listening on port:8009
```

Ejecutando script con nombres NO nativos de node, uso run <br>
`"start:dev":"tss && concurrently \"tsc -w\" \"nodemon dist/server.js\" "`

Este script **"start:dev"** lo ejecuto usando run, ademas uso **concurrently** para ejecutar otros comando al mismo tiempo. Pasos:

- 1º: **tsc**, transpila ts a js y envía a ./dist,
- **&&** (y luego)
- **concurrently** (seguido ejecuta lo sgt) ,
- **"tsc -w"** cuando transpiles detecta cambios y transpila el codigo.
- **nodemon** permite reiniciar el server por cada nuevo cambio transpilado  
  Ejecutando el programa desde server.js

```bash
/poo$ npm run start:dev

0:07:17 - Starting compilation in watch mode...
[0]
[1] Server listening on port:8009
[0]
[0] 0:07:18 - Found 0 errors. Watching for file changes.
[1] [nodemon] restarting due to changes...
[1] [nodemon] starting `node dist/server.js`
[1] Server listening on port:8009
^C[1] nodemon dist/server.js exited with code SIGINT
[0] tsc -w exited with code SIGINT
```

## Creando y extendiendo un fichero de configuración typscript
La presencia de un archivo **tsconfig.json** que es la base de otros posibles ficheros de configuración como **tsconfig.build.json**, para definimos la rura en el campo **extends:** y recien luego las nuevas reglas como **exclude:**
TS busca de forma predeterminada **tsconfig.json** en la carpeta actual, sino en su padre, así va subiendo de directorio.


```
// file tsconfig.build.json
  {
  "//":"Hago una extención de configuración desde ./tsconfig.json",
  "extends":"./tsconfig.json",

  "//":"ignora esto dirs cuando hagas tipado y la transpilacióm ",
  "exclude": ["node_modules","dist"]
  }
  ```
# Fuentes:

[Documentación fullstackopen](https://fullstackopen.com/es/part9)

# docker compose version