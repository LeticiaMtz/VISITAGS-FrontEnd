export class Login {
    constructor(_id = '', email = '', password = ''){
        this.email = email;
        this.password = password;
    }
    _id:string;
    email:string;
    password:string;
}
