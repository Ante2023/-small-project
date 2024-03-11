import * as dotenv from "dotenv";
import { DataSource, DataSourceOptions } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

//Clase abstracta, no se instancia, solo sirve para eredar
export abstract class ConfigServer {
  constructor() {
    // CUANDO LEVANTO EL PROYECTO, DOY VALOR A LA VARIABLE NODE_ENV
    // cuando instandio objeto ConfigServer, leo que varible está seteada en NODE_ENV . "production" o ""
    const nodeNameEnv = this.createPathEnv(this.nodeEnv); // leo NODE_ENV=, puede tener undefined o "production"
    // Cuando hago "node start:dev" o "start:prod". SETeo en NODE_ENV la variable que referencia a su fichero "producción o desarrollo"
    dotenv.config({
      path: nodeNameEnv,
    });
  }
  //función, si/no puede retornar alggo
  public getEnviroment(k: string): string | undefined {
    // RETORNA STRING O UNDEFINED
    /*process.env: Retorna un objeto conteniendo el entorno del usuario  */
    // console.log(process.env[k]);
    // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    return process.env[k]; // process.env['PORT']
  }
  //función: si/no puede retornar algo
  public getNumberEnv(k: string): number {
    return Number(this.getEnviroment(k));
  }
  //método get: si/si debe retornar algo, no puede ser void. "post no seguro"
  public get nodeEnv(): string {
    //RETORNA STRING
    //getEnviroment RETORNA STRING O UNDEFINED
    return this.getEnviroment("NODE_ENV")?.trim() || ""; //"?: arg izq opcional(puede ser undefined)" y trim() quita espacios en blanco
    /*Como hay 2 .env (prod/dev), desde NODE_ENV leemos 2 posibles valores, undefined | "production"; 
    en la funcíon dotenv.config({path:"/.env"}) cargamos el contenido del file específic<o que necesitan 
    las funciones del entorno . 
    dotenv.config({ path: '.env.production' });  dotenv.config({ path: '.env.development' });
    */
  }
  public createPathEnv(path: string): string {
    const arrEnv: Array<string> = ["env"]; // array con una cadena "env". también puede ser string[]
    if (path.length > 0) {
      //hola.me.cantas.algo split(".") -> ["hola","me","cantas","algo" ]
      const stringToArray = path.split("."); // split separa una cadena por . lo que está antes del . lo mete a un array como item
      //[1,2,3]unshift("a2","b") salida ["a2","b",1,2,3]
      arrEnv.unshift(...stringToArray); // inicia  otro array, primero con los argumentos  string ("del","array") stringToArray, luego items del array arrEnv
    }
    return "." + arrEnv.join("."); // ["aa","vv"] join(".") = aa.ww, si hay un solo item, no pone/ .["env"].join(".") -> .env
  }
  /**
     * get typeORMConfig, configura la conexion a DDBB
 :retorno un objeto DataSourceOptions */
  public get typeORMConfig(): DataSourceOptions {
    return {
      type: "mysql", // tipo de driver de DB
      // Datos de variables de entorno
      host: this.getEnviroment("BD_HOST"),
      port: this.getNumberEnv("BD_PORT"),
      username: this.getEnviroment("BD_USER"),
      password: this.getEnviroment("BD_PASSWORD"),
      database: this.getEnviroment("BD_DATABASE"),
      //Configuro lectura de entidades desde todos los dirs del proyecto buscando los  nombres tipo *.entity.js|ts
      // /** significa leer TODAS las carpetas y busqque dentro files que tengan /* cualquier nombre PERO  finalizado en entity.ts|js
      // /** puede ser reemplazado por la carpeta entitie si o si allí cuarde todos los entityes, pero si los guardo en varios dirs, no
      entities: [__dirname + "/../**/*.entity{.ts,.js}"],
      // resuelve las migraciones
      migrations: [__dirname + "/../../migrations/*{.ts,.js}"], // pero no usaremos migration, usaremos el de abajo , synchronize
      synchronize: false, // sincroniza los cambios backDB al reiniciar back.Borra contenido en cada reset

      // synchronize: true,  //ESTA EN EL MANUAL PERO GENERA ERROR!! POR ESO CAMBIE A FALSE
      logging: false,
      namingStrategy: new SnakeNamingStrategy(), // cambia de camelCase a camel_case
    };
  }
  async dbConnect(): Promise<DataSource> {
    return await new DataSource(this.typeORMConfig).initialize();
  }
}

/*
atributo env del objeto process retorna un objeto con info del runTime envirement  donde se exe
el programa
 console.log(process.env);
 output:
 {
  SHELL: '/bin/bash',
  SESSION_MANAGER: 'local/mihp:@/tmp/.ICE-unix/1943,unix/mihp:/tmp/.ICE-unix/1943',
  QT_ACCESSIBILITY: '1',
  COLORTERM: 'truecolor',
  XDG_CONFIG_DIRS: '/etc/xdg/xdg-ubuntu:/etc/xdg',
  SSH_AGENT_LAUNCHER: 'gnome-keyring',
  XDG_MENU_PREFIX: 'gnome-',
  TERM_PROGRAM_VERSION: '1.86.1',
  GNOME_DESKTOP_SESSION_ID: 'this-is-deprecated',
  GNOME_SHELL_SESSION_MODE: 'ubuntu',
  SSH_AUTH_SOCK: '/run/user/1000/keyring/ssh',
  XMODIFIERS: '@im=ibus',
  DESKTOP_SESSION: 'ubuntu',
  GTK_MODULES: 'gail:atk-bridge',
  PWD: '/home/dent/developer/Mi-Code2023/TypeScript/api-poo',
  XDG_SESSION_DESKTOP: 'ubuntu',
  LOGNAME: 'dent',
  XDG_SESSION_TYPE: 'wayland',
  SYSTEMD_EXEC_PID: '1969',
  XAUTHORITY: '/run/user/1000/.mutter-Xwaylandauth.W2VCJ2',
  VSCODE_GIT_ASKPASS_NODE: '/usr/share/code/code',
  IM_CONFIG_CHECK_ENV: '1',
  GJS_DEBUG_TOPICS: 'JS ERROR;JS LOG',
  HOME: '/home/dent',
  USERNAME: 'dent',
  IM_CONFIG_PHASE: '1',
  LANG: 'es_ES.UTF-8',
  LS_COLORS: 'rs=0:di=01;34:ln=01;36:mh=00:pi=40;33:so=01;35:do=01;35:bd=40;33;01:cd=40;33;01:or=40;31;01:mi=00:su=37;41:sg=30;43:ca=30;41:tw=30;42:ow=34;42:st=37;44:ex=01;32:*.tar=01;31:*.tgz=01;31:*.arc=01;31:*.arj=01;31:*.taz=01;31:*.lha=01;31:*.lz4=01;31:*.lzh=01;31:*.lzma=01;31:*.tlz=01;31:*.txz=01;31:*.tzo=01;31:*.t7z=01;31:*.zip=01;31:*.z=01;31:*.dz=01;31:*.gz=01;31:*.lrz=01;31:*.lz=01;31:*.lzo=01;31:*.xz=01;31:*.zst=01;31:*.tzst=01;31:*.bz2=01;31:*.bz=01;31:*.tbz=01;31:*.tbz2=01;31:*.tz=01;31:*.deb=01;31:*.rpm=01;31:*.jar=01;31:*.war=01;31:*.ear=01;31:*.sar=01;31:*.rar=01;31:*.alz=01;31:*.ace=01;31:*.zoo=01;31:*.cpio=01;31:*.7z=01;31:*.rz=01;31:*.cab=01;31:*.wim=01;31:*.swm=01;31:*.dwm=01;31:*.esd=01;31:*.jpg=01;35:*.jpeg=01;35:*.mjpg=01;35:*.mjpeg=01;35:*.gif=01;35:*.bmp=01;35:*.pbm=01;35:*.pgm=01;35:*.ppm=01;35:*.tga=01;35:*.xbm=01;35:*.xpm=01;35:*.tif=01;35:*.tiff=01;35:*.png=01;35:*.svg=01;35:*.svgz=01;35:*.mng=01;35:*.pcx=01;35:*.mov=01;35:*.mpg=01;35:*.mpeg=01;35:*.m2v=01;35:*.mkv=01;35:*.webm=01;35:*.webp=01;35:*.ogm=01;35:*.mp4=01;35:*.m4v=01;35:*.mp4v=01;35:*.vob=01;35:*.qt=01;35:*.nuv=01;35:*.wmv=01;35:*.asf=01;35:*.rm=01;35:*.rmvb=01;35:*.flc=01;35:*.avi=01;35:*.fli=01;35:*.flv=01;35:*.gl=01;35:*.dl=01;35:*.xcf=01;35:*.xwd=01;35:*.yuv=01;35:*.cgm=01;35:*.emf=01;35:*.ogv=01;35:*.ogx=01;35:*.aac=00;36:*.au=00;36:*.flac=00;36:*.m4a=00;36:*.mid=00;36:*.midi=00;36:*.mka=00;36:*.mp3=00;36:*.mpc=00;36:*.ogg=00;36:*.ra=00;36:*.wav=00;36:*.oga=00;36:*.opus=00;36:*.spx=00;36:*.xspf=00;36:',
  XDG_CURRENT_DESKTOP: 'Unity',
  WAYLAND_DISPLAY: 'wayland-0',
  GIT_ASKPASS: '/usr/share/code/resources/app/extensions/git/dist/askpass.sh',
  INVOCATION_ID: 'e53590266baf4bf3bfbbfedb3a05fc39',
  MANAGERPID: '1772',
  CHROME_DESKTOP: 'code-url-handler.desktop',
  GJS_DEBUG_OUTPUT: 'stderr',
  VSCODE_GIT_ASKPASS_EXTRA_ARGS: '',
  GNOME_SETUP_DISPLAY: ':1',
  LESSCLOSE: '/usr/bin/lesspipe %s %s',
  XDG_SESSION_CLASS: 'user',
  TERM: 'xterm-256color',
  LESSOPEN: '| /usr/bin/lesspipe %s',
  USER: 'dent',
  VSCODE_GIT_IPC_HANDLE: '/run/user/1000/vscode-git-1fd9b8c9a0.sock',
  DISPLAY: ':0',
  SHLVL: '1',
  QT_IM_MODULE: 'ibus',
  XDG_RUNTIME_DIR: '/run/user/1000',
  VSCODE_GIT_ASKPASS_MAIN: '/usr/share/code/resources/app/extensions/git/dist/askpass-main.js',
  JOURNAL_STREAM: '8:34902',
  XDG_DATA_DIRS: '/usr/share/ubuntu:/usr/local/share/:/usr/share/:/var/lib/snapd/desktop',
  GDK_BACKEND: 'x11',
  PATH: '/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:/snap/bin',
  GDMSESSION: 'ubuntu',
  ORIGINAL_XDG_CURRENT_DESKTOP: 'ubuntu:GNOME',
  DBUS_SESSION_BUS_ADDRESS: 'unix:path=/run/user/1000/bus',
  GIO_LAUNCHED_DESKTOP_FILE_PID: '4057',
  GIO_LAUNCHED_DESKTOP_FILE: '/usr/share/applications/code.desktop',
  TERM_PROGRAM: 'vscode',
  _: '/usr/bin/node'
}

> console.log(process.env["PATH"])
/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:/snap/bin

console.log(process.env["NODE_ENV"])
undefined  // en este caso NODE_ENV=undefines "developer con start:dev", la otra opción sería NODE_ENV="production con start:prod"
 */
