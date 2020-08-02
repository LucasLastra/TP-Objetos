"use strict";
exports.__esModule = true;
exports.home = void 0;
var ReadlineSync = require("readline-sync");
function home(cuenta, array, exit, comando) {
    while (exit == false) {
        console.log("Bienvenid@ al servidor! Que deseas hacer?");
        console.log('-- 1: Iniciar sesion. --');
        console.log('-- 2: Crear una cuenta. --');
        console.log('-- 3: Ver registros. --');
        console.log('-- 0: Salir del servidor. --');
        comando = ReadlineSync.questionInt('>>> ');
        //Intenté hacierlo con switch pero no funcionaban las acciones (ej: cuenta.logIn();).
        /*
        switch (comando) {
            case 1:
                cuenta.logIn();
            case 2:
                cuenta.signUp();
                cuenta.logIn();
            case 3:
                console.log(array);
            case 0:
                console.log('Saliendo del servidor...');
                exit = true;
            default:
                console.log('--Comando incorrecto!--');
        }
        */
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
}
exports.home = home;
