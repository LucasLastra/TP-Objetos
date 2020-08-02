"use strict";
exports.__esModule = true;
exports.cuenta = exports.array = void 0;
var ReadlineSync = require("readline-sync");
var home_1 = require("./home/home");
var passwords_1 = require("./passwords/passwords");
var accounts_1 = require("./accounts/accounts");
var comando;
exports.array = [];
var bcrypt = require('bcrypt');
var exit = false;
var Login = /** @class */ (function () {
    function Login(userInic, mailInic, passInic) {
        this.regPassword = new passwords_1.RegistroPassword;
        this.regAccounts = new accounts_1.RegistroAccounts;
        if (userInic) {
            this.user = userInic;
        }
        else {
            this.user = ReadlineSync.question('Escribir usuario nuevo: ');
        }
        if (mailInic) {
            this.regAccounts.mail = mailInic;
        }
        else {
            this.regAccounts.mail = ReadlineSync.question("Escribir mail nuevo de " + this.user + ": ");
        }
        if (passInic) {
            this.regPassword.pass = passInic;
            this.regPassword.hash = bcrypt.hashSync(this.regPassword.pass, this.regPassword.salt);
        }
        else {
            this.regPassword.createPass();
        }
        exports.array.push(this);
    }
    Login.prototype.logIn = function () {
        this.regAccounts.logIn(exports.cuenta, comando);
    };
    Login.prototype.signUp = function () {
        this.regAccounts.signUp();
        var user = ReadlineSync.question('Escribir usuario: ');
        var mail = ReadlineSync.question('Escribir mail: ');
        var pass = ReadlineSync.question('Escribir contraseña: ');
        exports.cuenta = new Login(user, mail, pass);
        exports.cuenta = exports.array[exports.array.length - 1];
        console.log(exports.cuenta);
    };
    Login.prototype.logUser = function () {
        this.regAccounts.logUser(exports.cuenta);
    };
    Login.prototype.deleteAccount = function () {
        this.regPassword.comparePass();
        if (this.regPassword.booleanPass == true) {
            this.regAccounts["delete"]();
        }
        else {
            console.log('--Contraseña incorrecta!--');
            this.deleteAccount();
        }
    };
    Login.prototype.createMail = function () {
        this.regAccounts.createMail();
    };
    Login.prototype.createUser = function () {
        this.regAccounts.createUser();
    };
    Login.prototype.createPass = function () {
        this.regPassword.createPass();
    };
    return Login;
}());
accounts_1.RegistroAccounts;
passwords_1.RegistroPassword;
exports.cuenta = new Login('lucas', 'lucas@gmail', '123');
exports.cuenta = new Login('abed', 'abed@', 'cool');
exports.cuenta = new Login('jeff', 'jeff@', 'stop');
exports.cuenta = new Login('britta', 'britta@', 'ruined');
exports.cuenta = new Login('pierce', 'pierce@', 'childish');
exports.cuenta = new Login('dan', 'dan@', 'danhar');
exports.cuenta = new Login('troy', 'troy@', 'troynabed');
exports.cuenta = new Login('eli', 'eli@', 'elizabeth');
exports.cuenta = new Login('javi', 'javi@', 'javinho');
exports.cuenta = new Login('santiago', 'santi@', 'santi');
exports.cuenta = new Login('emma', 'emma@', 'watson');
exports.cuenta = new Login();
home_1.home(exports.cuenta, exports.array, exit, comando);
