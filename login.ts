import * as ReadlineSync from 'readline-sync';
const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);




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
class Login {
    private user: string;
    private mail: string;
    private pass: string;
    private hash: string;
    private boolean: boolean;
    constructor(userInic?: string, mailInic?: string, passInic?: string) {
        if (userInic) {
            this.user = userInic;
        } else {
            this.createUser();
        }
        if (mailInic) {
            this.mail = mailInic;
        } else {
            this.createMail();
        }
        if (passInic) {
            this.pass = passInic;
            this.hash = bcrypt.hashSync(this.pass, salt);
        } else {
            this.createPass();
            this.logIn();
        }

    }
    public logIn(): void {
        console.log('----Iniciar sesion.----');
        let boolean1: boolean = this.logUser();
        let boolean2: boolean = this.logPass();

        if (boolean1 == true && boolean2 == true) {
            console.log('----Has iniciado sesion correctamente.----');
        } else {
            console.log('----El nombre de usuario o contraseña son incorrectos!----');
            this.logIn();
        }
    }
    public signUp(): void {
        console.log('----Bienvenido! Para registrarte ingrese usuario, mail y contraseña.----');
        this.createUser();
        this.createPass();
        console.log(this.user);
    }
    public logUser() {
        let compareUser: string = ReadlineSync.question('Escribir usuario: ');
        if (this.user == compareUser) {
            return true;
        } else {
            return false;
        }
    }
    public createMail(): void {
        console.log('----Crear mail nuevo.----');
        if (this.mail) {
            //si ya existe el mail, confirmar pass y escribir nuevo.
            let comparePass = ReadlineSync.question('Escribir contraseña: ');
            this.boolean = bcrypt.compareSync(comparePass, this.hash);
            if (this.boolean == true) {
                this.mail = ReadlineSync.question('Escribir mail nuevo: ');
            } else {
                console.log('----La contraseña es incorrecta!----');
                this.createMail();
            }
        } else {
            //si no hay mail, escribirlo.
            this.mail = ReadlineSync.question('Escribir mail nuevo: ');
        }
    }
    public createUser(): void {
        console.log('----Crear usuario nuevo.----');
        if (this.user) {
            //si ya existe el usuario, confirmar pass y escribir nuevo.
            let comparePass = ReadlineSync.question('Escribir contraseña: ');
            this.boolean = bcrypt.compareSync(comparePass, this.hash);
            if (this.boolean == true) {
                this.user = ReadlineSync.question('Escribir usuario nuevo: ');
                console.log('----Usuario cambiado correctamente!----');
            } else {
                console.log('----La contraseña es incorrecta!----');
                this.createUser();
            }
        } else {
            //si no hay usuario, escribirlo.
            this.user = ReadlineSync.question('Escribir usuario nuevo: ');
        }
    }
    public createPass(): void {
        console.log('----Crear contraseña nueva.----');
        if (this.pass) {
            //si ya existe la pass, confirmar la anterior y escribir nueva.
            let oldPass = ReadlineSync.question('Escribir contraseña anterior: ');
            this.boolean = bcrypt.compareSync(oldPass, this.hash);
            if (this.boolean == true) {
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
        //compara la contraseña con el hash.
        this.boolean = bcrypt.compareSync(this.pass, this.hash);
        if (this.boolean == true) {
            return true;
        } else {
            return false;
        }
    }
}

let log1: Login = new Login('Lucas', 'lucas@gmail');
let log2: Login = new Login();
console.log(log2);
console.log(log1);
log1.createUser();
log1.createPass();
log1.createMail();
console.log(log1);


