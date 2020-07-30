import * as ReadlineSync from 'readline-sync';
class Login {
    private user: string;
    private mail: string;
    private pass: string;
    constructor(userInic?: string, mailInic?: string, passInic?: string) {
        if (userInic) {
            this.user = userInic;
        } else {
            this.logUser();
        }
        if (mailInic) {
            this.mail = mailInic;
        } else {
            this.logMail();
        }
        if (passInic) {
            this.pass = passInic;
        } else {
            this.logPass();
        }

    }
    public login() {

    }
    public signUp() {
        console.log('----Bienvenido! Para registrarte ingrese usuario, mail y contraseña.----');
        this.logUser();
        this.logMail();
        this.logPass();
        console.log(this.user);
    }
    public logUser() {
        console.log('----Bienvenido! Para registrarte ingrese usuario, mail y contraseña.----');
        this.user = ReadlineSync.question('Escribir Nombre de usuario: ');
    }
    public logMail() {
        console.log('----Bienvenido! Para registrarte ingrese usuario, mail y contraseña.----');
        this.mail = ReadlineSync.question('Escribir mail: ');
    }
    public logPass() {
        console.log('----Bienvenido! Para registrarte ingrese usuario, mail y contraseña.----');
        this.pass = ReadlineSync.question('Escribir contraseña: ');
    }

}

let log1: Login = new Login('Lucas', 'lucas@gmail');

console.log(log1);
log1.signUp();
console.log(log1);
