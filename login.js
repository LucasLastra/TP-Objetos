"use strict";
exports.__esModule = true;
var ReadlineSync = require("readline-sync");
var bcrypt = require('bcrypt');
var saltRounds = 10;
var salt = bcrypt.genSaltSync(saltRounds);
/*
bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
        // Store hash in your password DB.
    });
});

// Load hash from the db, which was preivously stored
bcrypt.compare(myPlaintextPassword, hash, function(err, res) {
    if(res == true){
        console.log('siiii');
    }else{
        console.log('noooo');
    }
  // if res == true, password matched
  // else wrong password
});
*/
var Login = /** @class */ (function () {
    function Login(userInic, mailInic, passInic) {
        if (userInic) {
            this.user = userInic;
        }
        else {
            this.createUser();
        }
        if (mailInic) {
            this.mail = mailInic;
        }
        else {
            this.createMail();
        }
        if (passInic) {
            this.pass = passInic;
            this.hash = bcrypt.hashSync(this.pass, salt);
        }
        else {
            this.createPass();
            this.logIn();
        }
    }
    Login.prototype.logIn = function () {
        console.log('----Iniciar sesion.----');
        var boolean1 = this.logUser();
        var boolean2 = this.logPass();
        if (boolean1 == true && boolean2 == true) {
            console.log('----Has iniciado sesion correctamente.----');
        }
        else {
            console.log('----El nombre de usuario o contraseña son incorrectos!----');
            this.logIn();
        }
    };
    Login.prototype.signUp = function () {
        console.log('----Bienvenido! Para registrarte ingrese usuario, mail y contraseña.----');
        this.createUser();
        this.createPass();
        console.log(this.user);
    };
    Login.prototype.logUser = function () {
        var compareUser = ReadlineSync.question('Escribir usuario: ');
        if (this.user == compareUser) {
            return true;
        }
        else {
            return false;
        }
    };
    Login.prototype.createMail = function () {
        console.log('----Crear mail nuevo.----');
        if (this.mail) {
            //si ya existe el mail, confirmar pass y escribir nuevo.
            var comparePass = ReadlineSync.question('Escribir contraseña: ');
            this.boolean = bcrypt.compareSync(comparePass, this.hash);
            if (this.boolean == true) {
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
        }
    };
    Login.prototype.createUser = function () {
        console.log('----Crear usuario nuevo.----');
        if (this.user) {
            //si ya existe el usuario, confirmar pass y escribir nuevo.
            var comparePass = ReadlineSync.question('Escribir contraseña: ');
            this.boolean = bcrypt.compareSync(comparePass, this.hash);
            if (this.boolean == true) {
                this.user = ReadlineSync.question('Escribir usuario nuevo: ');
                console.log('----Usuario cambiado correctamente!----');
            }
            else {
                console.log('----La contraseña es incorrecta!----');
                this.createUser();
            }
        }
        else {
            //si no hay usuario, escribirlo.
            this.user = ReadlineSync.question('Escribir usuario nuevo: ');
        }
    };
    Login.prototype.createPass = function () {
        console.log('----Crear contraseña nueva.----');
        if (this.pass) {
            //si ya existe la pass, confirmar la anterior y escribir nueva.
            var oldPass = ReadlineSync.question('Escribir contraseña anterior: ');
            this.boolean = bcrypt.compareSync(oldPass, this.hash);
            if (this.boolean == true) {
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
    Login.prototype.logPass = function () {
        this.pass = ReadlineSync.question('Escribir contraseña: ');
        //compara la contraseña con el hash.
        this.boolean = bcrypt.compareSync(this.pass, this.hash);
        if (this.boolean == true) {
            return true;
        }
        else {
            return false;
        }
    };
    return Login;
}());
var log1 = new Login('Lucas', 'lucas@gmail');
var log2 = new Login();
console.log(log2);
console.log(log1);
log1.createUser();
log1.createPass();
log1.createMail();
console.log(log1);
