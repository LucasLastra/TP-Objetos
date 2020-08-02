"use strict";
exports.__esModule = true;
exports.RegistroPassword = void 0;
var ReadlineSync = require("readline-sync");
var bcrypt = require('bcrypt');
var RegistroPassword = /** @class */ (function () {
    function RegistroPassword() {
        this.saltRounds = 10;
        this.salt = bcrypt.genSaltSync(this.saltRounds);
        if (this.pass) {
            this.hash = bcrypt.hashSync(this.pass, this.salt);
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
        this.hash = bcrypt.hashSync(this.pass, this.salt);
    };
    RegistroPassword.prototype.logPass = function () {
        this.pass = ReadlineSync.question('Escribir contraseña: ');
    };
    RegistroPassword.prototype.comparePass = function () {
        var pass = ReadlineSync.question('Escribir contraseña: ');
        this.booleanPass = bcrypt.compareSync(pass, this.hash);
    };
    return RegistroPassword;
}());
exports.RegistroPassword = RegistroPassword;
