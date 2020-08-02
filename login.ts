import * as ReadlineSync from 'readline-sync';
import { home } from './home/home';
import { RegistroPassword } from './passwords/passwords'
import { RegistroAccounts } from './accounts/accounts'
let comando: number;
export let array = [];
const bcrypt = require('bcrypt');
let exit: boolean = false;
class Login {
    public user: string;
    public regPassword: RegistroPassword = new RegistroPassword;
    public regAccounts: RegistroAccounts = new RegistroAccounts;
    public booleanUser: boolean;
    constructor(userInic?: string, mailInic?: string, passInic?: string) {
        if (userInic) {
            this.user = userInic;
        } else {
            this.user = ReadlineSync.question('Escribir usuario nuevo: ');
        }
        if (mailInic) {
            this.regAccounts.mail = mailInic;
        } else {
            this.regAccounts.mail = ReadlineSync.question(`Escribir mail nuevo de ${this.user}: `);
        }
        if (passInic) {
            this.regPassword.pass = passInic;
            this.regPassword.hash = bcrypt.hashSync(this.regPassword.pass, this.regPassword.salt);
        } else {
            this.regPassword.createPass();
        }
        array.push(this);
    }
    public logIn(): void {
        this.regAccounts.logIn(cuenta, comando);
    }
    public signUp(): void {
        this.regAccounts.signUp();
        let user = ReadlineSync.question('Escribir usuario: ');
        let mail = ReadlineSync.question('Escribir mail: ');
        let pass = ReadlineSync.question('Escribir contraseña: ');
        cuenta = new Login(user, mail, pass);
        cuenta = array[array.length - 1];
        console.log(cuenta);
    }
    public logUser(): void {
        this.regAccounts.logUser(cuenta);
    }
    public deleteAccount(): void {
        this.regPassword.comparePass();
        if(this.regPassword.booleanPass == true){
            this.regAccounts.delete();
        }else{
            console.log('--Contraseña incorrecta!--');
            this.deleteAccount();
        }
        
    }
    public createMail(): void {
        this.regAccounts.createMail();
    }
    public createUser(): void {
        this.regAccounts.createUser();
    }
    public createPass(): void {
        this.regPassword.createPass();
    }
}
RegistroAccounts;
RegistroPassword;
export let cuenta: Login = new Login('lucas', 'lucas@gmail', '123');
cuenta = new Login('abed', 'abed@', 'cool');
cuenta = new Login('jeff', 'jeff@', 'stop');
cuenta = new Login('britta', 'britta@', 'ruined');
cuenta = new Login('pierce', 'pierce@', 'childish');
cuenta = new Login('dan', 'dan@', 'danhar');
cuenta = new Login('troy', 'troy@', 'troynabed');
cuenta = new Login('eli', 'eli@', 'elizabeth');
cuenta = new Login('javi', 'javi@', 'javinho');
cuenta = new Login('santiago', 'santi@', 'santi');
cuenta = new Login('emma', 'emma@', 'watson');
cuenta = new Login();
home(cuenta, array, exit, comando);

