import * as ReadlineSync from 'readline-sync';
const bcrypt = require('bcrypt');
export class RegistroPassword {
    public saltRounds: number = 10;
    public salt = bcrypt.genSaltSync(this.saltRounds);
    public pass: string;
    public hash: string;
    public booleanPass: boolean;
    constructor() {
        if (this.pass) {
            this.hash = bcrypt.hashSync(this.pass, this.salt);
        }
    }
    public createPass(): void {
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
        this.hash = bcrypt.hashSync(this.pass, this.salt);
    }
    public logPass(): void {
        this.pass = ReadlineSync.question('Escribir contraseña: ');
    }
    public comparePass(): void {
        let pass = ReadlineSync.question('Escribir contraseña: ');
        this.booleanPass = bcrypt.compareSync(pass, this.hash);
    }
}