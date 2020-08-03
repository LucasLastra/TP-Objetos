"use strict";
exports.__esModule = true;
var ReadlineSync = require("readline-sync");
var bcrypt = require('bcrypt');
var saltRounds = 10;
var salt = bcrypt.genSaltSync(saltRounds);
var comando;
var iniciarSesion = false;
var exit = false;
var array = [];
var i = 0;
var Login = /** @class */ (function () {
    function Login(userInic, mailInic, passInic) {
        this.regPassword = new RegistroPassword;
        if (userInic) {
            this.user = userInic;
        }
        else {
            cuenta.createUser();
        }
        if (mailInic) {
            this.mail = mailInic;
        }
        else {
            cuenta.createMail();
        }
        if (passInic) {
            this.regPassword.pass = passInic;
            this.regPassword.hash = bcrypt.hashSync(this.regPassword.pass, salt);
        }
        else {
            cuenta.regPassword.createPass();
        }
        array.push(this);
    }
    Login.prototype.createPass = function () {
        this.regPassword.createPass();
    };
    Login.prototype.logIn = function () {
        console.log('----Iniciar sesion.----');
        cuenta.logUser();
        cuenta.regPassword.logPass();
        console.log(cuenta);
        //compara la contraseña con el hash.
        cuenta.regPassword.booleanPass = bcrypt.compareSync(cuenta.regPassword.pass, cuenta.regPassword.hash);
        console.log(cuenta.booleanUser);
        console.log(cuenta.regPassword.booleanPass);
        if (cuenta.regPassword.booleanPass == true && cuenta.booleanUser == true) {
            console.log("----Has iniciado sesion correctamente, " + cuenta.user + "!----");
            iniciarSesion = true;
        }
        else {
            console.log('----El nombre de usuario o contraseña son incorrectos!----');
            this.logIn();
        }
        while (iniciarSesion == true) {
            console.log("* Nombre: " + cuenta.user + " *");
            console.log("* Mail: " + cuenta.mail + " *");
            console.log("* contrase\u00F1a: " + cuenta.regPassword.pass + " *");
            console.log("----Bienvenid@ de nuevo, " + cuenta.user + "! Que deseas hacer?----");
            console.log('-- 1: Cambiar nombre de usuario. --');
            console.log('-- 2: Cambiar mail. --');
            console.log('-- 3: Cambiar contraseña. --');
            console.log('-- 4: Eliminar cuenta. --');
            console.log('-- 0: Cerrar sesion. --');
            comando = ReadlineSync.question('>>> ');
            //Intenté hacierlo con switch pero no funcionaban las acciones (ej: cuenta.logIn();).
            if (comando == 1) {
                cuenta.createUser();
            }
            else {
                if (comando == 2) {
                    cuenta.createMail();
                }
                else {
                    if (comando == 3) {
                        cuenta.createPass();
                    }
                    else {
                        if (comando == 4) {
                            cuenta.deleteAccount();
                        }
                        else {
                            if (comando == 0) {
                                console.log('Cerrando la sesion...');
                                iniciarSesion = false;
                            }
                            else {
                                console.log('--Comando incorrecto!--');
                            }
                        }
                    }
                }
            }
        }
    };
    Login.prototype.signUp = function () {
        console.log('----Bienvenido! Para registrarte ingrese usuario, mail y contraseña.----');
        var user = ReadlineSync.question('Escribir usuario: ');
        var mail = ReadlineSync.question('Escribir mail: ');
        var pass = ReadlineSync.question('Escribir contraseña: ');
        cuenta = new Login(user, mail, pass);
        cuenta = array[array.length - 1];
        console.log(cuenta);
    };
    Login.prototype.logUser = function () {
        var compareUser = ReadlineSync.question('Escribir usuario: ');
        var temp;
        cuenta.booleanUser = false;
        for (var i_1 = 0; i_1 < array.length; i_1++) {
            cuenta = array[i_1];
            if (cuenta.user == compareUser) {
                temp = i_1;
                cuenta.booleanUser = true;
                cuenta = array[temp];
                console.log('user: ' + cuenta.booleanUser);
                break;
            }
        }
    };
    Login.prototype.deleteAccount = function () {
        this.regPassword.comparePass();
        for (var i_2 = 0; i_2 < array.length; i_2++) {
            if (cuenta == array[i_2]) {
                array.splice(i_2, 1);
                console.log(array);
            }
        }
        console.log('--Cuenta eliminada.--');
        iniciarSesion = false;
    };
    Login.prototype.createMail = function () {
        console.log('----Crear mail nuevo.----');
        if (this.mail) {
            //si ya existe el mail, confirmar pass y escribir nuevo.
            this.regPassword.comparePass();
            if (this.regPassword.booleanPass == true) {
                this.mail = ReadlineSync.question('Escribir mail nuevo: ');
            }
            else {
                console.log('----La contraseña es incorrecta!----');
                this.createMail();
            }
        }
        else {
            //si no hay mail, escribirlo.
            this.mail = ReadlineSync.question('Escribir mail nuevo: ');
            console.log("----Mail de " + this.user + ": " + this.mail + ".----");
        }
    };
    Login.prototype.createUser = function () {
        if (cuenta.user) {
            console.log("----Crear usuario nuevo para " + this.user + ".----");
            //si ya existe el usuario, confirmar pass y escribir nuevo.
            this.regPassword.comparePass();
            console.log(this);
            if (this.regPassword.booleanPass === true) {
                this.user = ReadlineSync.question('Escribir usuario nuevo: ');
                console.log("----Usuario cambiado correctamente, " + this.user + "!----");
            }
            else {
                console.log('----La contraseña es incorrecta!----');
                this.createUser();
            }
        }
        else {
            console.log("----Crear usuario nuevo.----");
            //si no hay usuario, escribirlo.
            cuenta.user = ReadlineSync.question('Escribir usuario nuevo: ');
        }
    };
    return Login;
}());
var RegistroPassword = /** @class */ (function () {
    function RegistroPassword() {
        if (this.pass) {
            this.hash = bcrypt.hashSync(this.pass, salt);
        }
    }
    RegistroPassword.prototype.createPass = function () {
        console.log('----Crear contraseña nueva.----');
        if (this.pass) {
            //si ya existe la pass, confirmar la anterior y escribir nueva.
            var oldPass = ReadlineSync.question('Escribir contraseña anterior: ');
            var boolean = bcrypt.compareSync(oldPass, this.hash);
            if (boolean == true) {
                this.pass = ReadlineSync.question('Escribir contraseña nueva: ');
                console.log('----La contraseña se cambio correctamente!----');
            }
            else {
                console.log('----La contraseña anterior es incorrecta!----');
                this.createPass();
            }
        }
        else {
            //si no hay pass, escribirla.
            this.pass = ReadlineSync.question('Escribir contraseña nueva: ');
        }
        //crea hash para nueva pass.
        this.hash = bcrypt.hashSync(this.pass, salt);
    };
    RegistroPassword.prototype.logPass = function () {
        this.pass = ReadlineSync.question('Escribir contraseña: ');
    };
    RegistroPassword.prototype.comparePass = function () {
        var pass = ReadlineSync.question('Escribir contraseña: ');
        this.booleanPass = bcrypt.compareSync(pass, this.hash);
        console.log(this.booleanPass);
    };
    return RegistroPassword;
}());
var log1 = new Login('lucas', 'lucas@gmail', '123');
var log2 = new Login('pepe', 'pepe@', 'lala');
var cuenta = new Login('carlos', 'carlos@', 'carlitos');
console.log(log2);
console.log(log1);
while (exit == false) {
    console.log("Bienvenid@ al servidor! Que deseas hacer?");
    console.log('-- 1: Iniciar sesion. --');
    console.log('-- 2: Crear una cuenta. --');
    console.log('-- 3: Ver registros. --');
    console.log('-- 0: Salir del servidor. --');
    comando = ReadlineSync.question('>>> ');
    //Intenté hacierlo con switch pero no funcionaban las acciones (ej: cuenta.logIn();).
    if (comando == 1) {
        cuenta.logIn();
    }
    else {
        if (comando == 2) {
            cuenta.signUp();
            cuenta.logIn();
        }
        else {
            if (comando == 3) {
                console.log(array);
            }
            else {
                if (comando == 0) {
                    console.log('Saliendo del servidor...');
                    exit = true;
                }
                else {
                    console.log('--Comando incorrecto!--');
                }
            }
        }
    }
}
