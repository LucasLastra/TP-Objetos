import * as ReadlineSync from 'readline-sync';
import { array } from '../login';
const bcrypt = require('bcrypt');
let iniciarSesion: boolean = false;
let cuentaTemp;
export class RegistroAccounts {
    public mail: string;
    constructor() {
    }
    public logIn(cuenta, comando): void {
        console.log('----Iniciar sesion.----');
        cuenta.logUser(cuenta);
        cuentaTemp.regPassword.logPass();
        //compara la contraseña con el hash.
        let boolean2 = bcrypt.compareSync(cuentaTemp.regPassword.pass, cuentaTemp.regPassword.hash);
        if (boolean2 == true && cuentaTemp.booleanUser == true) {
            console.log(`----Has iniciado sesion correctamente, ${cuentaTemp.user}!----`);
            iniciarSesion = true;
        } else {
            console.log('----El nombre de usuario o contraseña son incorrectos!----');
            this.logIn(cuenta, comando);
        }
        while (iniciarSesion == true) {
            console.log(`* Nombre: ${cuentaTemp.user} *`);
            console.log(`* Mail: ${cuentaTemp.regAccounts.mail} *`);
            console.log(`* contraseña: ${cuentaTemp.regPassword.pass} *`);
            console.log(`----Bienvenid@ de nuevo, ${cuentaTemp.user}! Que deseas hacer?----`);
            console.log('-- 1: Cambiar nombre de usuario. --');
            console.log('-- 2: Cambiar mail. --');
            console.log('-- 3: Cambiar contraseña. --');
            console.log('-- 4: Eliminar cuenta. --');
            console.log('-- 0: Cerrar sesion. --');
            comando = ReadlineSync.questionInt('>>> ');
            //Intenté hacierlo con switch pero no funcionaban las acciones (ej: cuenta.logIn();).
            if (comando == 1) {
                cuentaTemp.createUser();
            } else {
                if (comando == 2) {
                    cuentaTemp.createMail();
                } else {
                    if (comando == 3) {
                        cuentaTemp.createPass();
                    } else {
                        if (comando == 4) {
                            cuentaTemp.deleteAccount();
                        } else {
                            if (comando == 0) {
                                console.log('Cerrando la sesion...');
                                iniciarSesion = false;
                            } else {
                                console.log('--Comando incorrecto!--');
                            }
                        }
                    }
                }
            }
        }
    }
    public createUser(): void {
        if (cuentaTemp.user) {
            console.log(`----Crear usuario nuevo para ${cuentaTemp.user}.----`);
            //si ya existe el usuario, confirmar pass y escribir nuevo.
            cuentaTemp.regPassword.comparePass();
            if (cuentaTemp.regPassword.booleanPass === true) {
                cuentaTemp.user = ReadlineSync.question('Escribir usuario nuevo: ');
                console.log(`----Usuario cambiado correctamente, ${cuentaTemp.user}!----`);
            } else {
                console.log('----La contraseña es incorrecta!----');
                this.createUser();
            }
        } else {
            console.log(`----Crear usuario nuevo.----`);
            //si no hay usuario, escribirlo.
            cuentaTemp.user = ReadlineSync.question('Escribir usuario nuevo: ');
        }
    }
    public signUp(): void {
        console.log('----Bienvenido! Para registrarte ingrese usuario, mail y contraseña.----');
    }
    public delete(): void {
        for (let i: number = 0; i < array.length; i++) {
            if (cuentaTemp == array[i]) {
                array.splice(i, 1);
            }
        }
        console.log('--Cuenta eliminada.--');
        iniciarSesion = false;
    }
    public logUser(cuenta): void {
        let compareUser: string = ReadlineSync.question('Escribir usuario: ');
        let temp1: number;
        cuentaTemp = cuenta;
        cuentaTemp.booleanUser = false;
        for (let i: number = 0; i < array.length; i++) {
            cuenta = array[i];
            if (cuenta.user == compareUser) {
                temp1 = i;
                cuenta = array[temp1];
                cuentaTemp = cuenta;
                cuentaTemp.booleanUser = true;
                break;
            }
        }
    }
    public createMail(): void {
        console.log('----Crear mail nuevo.----');
        if (this.mail) {
            //si ya existe el mail, confirmar pass y escribir nuevo.
            cuentaTemp.regPassword.comparePass();
            if (cuentaTemp.regPassword.booleanPass == true) {
                this.mail = ReadlineSync.question('Escribir mail nuevo: ');
            } else {
                console.log('----La contraseña es incorrecta!----');
                cuentaTemp.createMail();
            }
        } else {
            //si no hay mail, escribirlo.
            cuentaTemp.mail = ReadlineSync.question('Escribir mail nuevo: ');
            console.log(`----Mail de ${cuentaTemp.user}: ${cuentaTemp.mail}.----`);
        }
    }
}