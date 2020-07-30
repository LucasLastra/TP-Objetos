"use strict";
exports.__esModule = true;
var ReadlineSync = require("readline-sync");
var Login = /** @class */ (function () {
    function Login(userInic, mailInic, passInic) {
        if (userInic) {
            this.user = userInic;
        }
        else {
            this.logUser();
        }
        if (mailInic) {
            this.mail = mailInic;
        }
        else {
            this.logMail();
        }
        if (passInic) {
            this.pass = passInic;
        }
        else {
            this.logPass();
        }
    }
    Login.prototype.login = function () {
    };
    Login.prototype.signUp = function () {
        console.log('----Bienvenido! Para registrarte ingrese usuario, mail y contraseña.----');
        this.logUser();
        this.logMail();
        this.logPass();
        console.log(this.user);
    };
    Login.prototype.logUser = function () {
        console.log('----Bienvenido! Para registrarte ingrese usuario, mail y contraseña.----');
        this.user = ReadlineSync.question('Escribir Nombre de usuario: ');
    };
    Login.prototype.logMail = function () {
        console.log('----Bienvenido! Para registrarte ingrese usuario, mail y contraseña.----');
        this.mail = ReadlineSync.question('Escribir mail: ');
    };
    Login.prototype.logPass = function () {
        console.log('----Bienvenido! Para registrarte ingrese usuario, mail y contraseña.----');
        this.pass = ReadlineSync.question('Escribir contraseña: ');
    };
    return Login;
}());
var log1 = new Login('Lucas', 'lucas@gmail');
console.log(log1);
log1.signUp();
console.log(log1);
