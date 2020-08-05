import { observable } from 'imagine';
import { post } from '../helpers/helpers';
import { app, TOKEN_IDENTIFIER } from '../index';
import { User } from '../model/user';

export class LoginViewModel {
    @observable html: string;
    @observable signup: boolean;
    @observable email: string;
    @observable password: string;
    @observable errorMessages: string[];

    constructor() {
        this.html = '';
        this.signup = false;
        this.email = '';
        this.password = '';
        this.errorMessages = [];

        fetch(`./views/login.html`).then((response: Response): void => {
            response.text().then((text: string): void => {
                this.html = text;
            });
        });
    }

    signin = (): void => {
        if (this.email === '' || this.password === '') {
            this.errorMessages = ['Please fill in all fields'];
            return;
        }

        this.errorMessages = [];

        post('/users/login', { 
            user: { 
                email: this.email, 
                password: this.password 
            } 
        }).then((data: any) => {
            if(data.user) {
                localStorage.setItem(TOKEN_IDENTIFIER, data.user.token);
                app.user = new User(data.user);
                document.location.href = '/#/';
            }
            
            this.errorMessages = ['Invalid username or password'];
        });
    }
}