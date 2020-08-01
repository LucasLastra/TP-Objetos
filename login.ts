import * as ReadlineSync from 'readline-sync';
import { Console } from 'console';
const bcrypt = require('bcrypt');
const saltRounds: number = 10;
const salt = bcrypt.genSaltSync(saltRounds);
let comando: number;
let iniciarSesion: boolean = false;
let exit: boolean = false;
let array = [];
let i: number = 0;
class Login {
    private user: string;
    private mail: string;
    private regPassword: RegistroPassword = new RegistroPassword;
    public booleanUser: boolean;

    constructor(userInic?: string, mailInic?: string, passInic?: string) {
        if (userInic) {
            this.user = userInic;
        } else {
            cuenta.createUser();
        }
        if (mailInic) {
            this.mail = mailInic;
        } else {
            cuenta.createMail();
        }
        if (passInic) {
            this.regPassword.pass = passInic;
            this.regPassword.hash = bcrypt.hashSync(this.regPassword.pass, salt);

        } else {
            cuenta.regPassword.createPass();
        }
        array.push(this);
    }
    public createPass(): void {
        this.regPassword.createPass();
    }
    public logIn() {
        console.log('----Iniciar sesion.----');
        cuenta.logUser();
        cuenta.regPassword.logPass();
        console.log(cuenta)
        //compara la contraseña con el hash.
        cuenta.regPassword.booleanPass = bcrypt.compareSync(cuenta.regPassword.pass, cuenta.regPassword.hash);
        console.log(cuenta.booleanUser)
        console.log(cuenta.regPassword.booleanPass)
        if (cuenta.regPassword.booleanPass == true && cuenta.booleanUser == true) {
            console.log(`----Has iniciado sesion correctamente, ${cuenta.user}!----`);
            iniciarSesion = true;
        } else {
            console.log('----El nombre de usuario o contraseña son incorrectos!----');
            this.logIn();
        }
        while (iniciarSesion == true) {
            console.log(`* Nombre: ${cuenta.user} *`);
            console.log(`* Mail: ${cuenta.mail} *`);
            console.log(`* contraseña: ${cuenta.regPassword.pass} *`);
            console.log(`----Bienvenid@ de nuevo, ${cuenta.user}! Que deseas hacer?----`);
            console.log('-- 1: Cambiar nombre de usuario. --');
            console.log('-- 2: Cambiar mail. --');
            console.log('-- 3: Cambiar contraseña. --');
            console.log('-- 4: Eliminar cuenta. --');
            console.log('-- 0: Cerrar sesion. --');
            comando = ReadlineSync.question('>>> ');
            //Intenté hacierlo con switch pero no funcionaban las acciones (ej: cuenta.logIn();).
            if (comando == 1) {
                cuenta.createUser();
            } else {
                if (comando == 2) {
                    cuenta.createMail();
                } else {
                    if (comando == 3) {
                        cuenta.createPass();
                    } else {
                        if (comando == 4) {
                            cuenta.deleteAccount();
                        } else {
                            if (comando == 0) {
                                console.log('Cerrando la sesion...')
                                iniciarSesion = false;
                            }else{
                                console.log('--Comando incorrecto!--')
                            }
                        }
                    }
                }
            }
        }
    }
    public signUp(): void {
        console.log('----Bienvenido! Para registrarte ingrese usuario, mail y contraseña.----');
        let user: string = ReadlineSync.question('Escribir usuario: ');
        let mail: string = ReadlineSync.question('Escribir mail: ');
        let pass: string = ReadlineSync.question('Escribir contraseña: ');
        cuenta = new Login(user, mail, pass)
        cuenta = array[array.length - 1];
        console.log(cuenta)
    }
    public logUser() {
        let compareUser: string = ReadlineSync.question('Escribir usuario: ');
        let temp: number;
        cuenta.booleanUser = false;
        for (let i: number = 0; i < array.length; i++) {
            cuenta = array[i];
            if (cuenta.user == compareUser) {
                temp = i
                cuenta.booleanUser = true;
                cuenta = array[temp];
                console.log('user: ' + cuenta.booleanUser)
                break;
            }
        }
    }
    public deleteAccount() {
        this.regPassword.comparePass()
        for (let i: number = 0; i < array.length; i++) {
            if (cuenta == array[i]) {
                array.splice(i, 1);
                console.log(array);
            }
        }
        console.log('--Cuenta eliminada.--');
        iniciarSesion = false;
    }
    public createMail(): void {
        console.log('----Crear mail nuevo.----');
        if (this.mail) {
            //si ya existe el mail, confirmar pass y escribir nuevo.
            this.regPassword.comparePass();
            if (this.regPassword.booleanPass == true) {
                this.mail = ReadlineSync.question('Escribir mail nuevo: ');
            } else {
                console.log('----La contraseña es incorrecta!----');
                this.createMail();
            }
        } else {
            //si no hay mail, escribirlo.
            this.mail = ReadlineSync.question('Escribir mail nuevo: ');
            console.log(`----Mail de ${this.user}: ${this.mail}.----`);
        }
    }
    public createUser(): void {
        if (cuenta.user) {
            console.log(`----Crear usuario nuevo para ${this.user}.----`);
            //si ya existe el usuario, confirmar pass y escribir nuevo.
            this.regPassword.comparePass();
            console.log(this)
            if (this.regPassword.booleanPass === true) {
                this.user = ReadlineSync.question('Escribir usuario nuevo: ');
                console.log(`----Usuario cambiado correctamente, ${this.user}!----`);
            } else {
                console.log('----La contraseña es incorrecta!----');
                this.createUser();
            }
        } else {
            console.log(`----Crear usuario nuevo.----`);
            //si no hay usuario, escribirlo.
            cuenta.user = ReadlineSync.question('Escribir usuario nuevo: ');
        }
    }
}
class RegistroPassword {
    public pass: string;
    public hash: string;
    public booleanPass: boolean;
    constructor() {
        if (this.pass) {
            this.hash = bcrypt.hashSync(this.pass, salt);
        }
    }
    public createPass() {
        console.log('----Crear contraseña nueva.----');
        if (this.pass) {
            //si ya existe la pass, confirmar la anterior y escribir nueva.
            let oldPass = ReadlineSync.question('Escribir contraseña anterior: ');
            let boolean: boolean = bcrypt.compareSync(oldPass, this.hash);
            if (boolean == true) {
                this.pass = ReadlineSync.question('Escribir contraseña nueva: ');
                console.log('----La contraseña se cambio correctamente!----');
            } else {
                console.log('----La contraseña anterior es incorrecta!----');
                this.createPass();
            }
        } else {
            //si no hay pass, escribirla.
            this.pass = ReadlineSync.question('Escribir contraseña nueva: ');
        }
        //crea hash para nueva pass.
        this.hash = bcrypt.hashSync(this.pass, salt);
    }
    public logPass() {
        this.pass = ReadlineSync.question('Escribir contraseña: ');
    }
    public comparePass() {
        let pass = ReadlineSync.question('Escribir contraseña: ');
        this.booleanPass = bcrypt.compareSync(pass, this.hash);
        console.log(this.booleanPass)
    }
}
let log1: Login = new Login('lucas', 'lucas@gmail', '123');
let log2: Login = new Login('pepe', 'pepe@', 'lala');
let cuenta: Login = new Login('carlos', 'carlos@', 'carlitos');
console.log(log2);
console.log(log1);

while (exit == false) {
    console.log(`Bienvenid@ al servidor! Que deseas hacer?`);
    console.log('-- 1: Iniciar sesion. --');
    console.log('-- 2: Crear una cuenta. --');
    console.log('-- 3: Ver registros. --');
    console.log('-- 0: Salir del servidor. --');
    comando = ReadlineSync.question('>>> ');
    //Intenté hacierlo con switch pero no funcionaban las acciones (ej: cuenta.logIn();).
    if (comando == 1) {
        cuenta.logIn();
    } else {
        if (comando == 2) {
            cuenta.signUp();
            cuenta.logIn();
        } else {
            if (comando == 3) {
                console.log(array);
            } else {
                if (comando == 0) {
                    console.log('Saliendo del servidor...');
                    exit = true;
                }else{
                    console.log('--Comando incorrecto!--');
                }
            }
        }
    }
}