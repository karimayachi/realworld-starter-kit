import { observable } from 'imagine';
import { app, TOKEN_IDENTIFIER } from '../index';
import { put } from '../helpers/helpers';

export class SettingsViewModel {
    @observable html: string;
    @observable image: string;
    @observable username: string;
    @observable bio: string;
    @observable email: string;
    @observable password: string;
    @observable errorMessages: string[];

    constructor() {
        this.html = '';
        this.email = app.user!.email;
        this.username = app.user!.username;
        this.image = app.user!.image;
        this.password = '';
        this.bio = app.user!.bio;
        this.errorMessages = [];

        fetch(`./views/settings.html`).then((response: Response): void => {
            response.text().then((text: string): void => {
                this.html = text;
            });
        });
    }

    logout = (): void => {
        localStorage.removeItem(TOKEN_IDENTIFIER);
        app.user = undefined;
        document.location.href = '/#/';
    }

    update = (): void => {
        this.errorMessages = [];

        let data: any = {
            username: this.username || undefined,
            image: this.image || undefined,
            email: this.email || undefined,
            bio: this.bio || undefined,
            password: this.password || undefined
        };

        put('/user', { 
            user: data
        }).then((data: any) => {
            if(data.user) {
                app.user!.bio = data.user.bio;
                app.user!.email = data.user.email;
                app.user!.image = data.user.image;
                app.user!.username = data.user.username;
                document.location.href = '/#/';
            }
            else if(data.errors) {
                for(let error in data.errors) {
                    this.errorMessages.push(`${error}: ${data.errors[error]}`);
                }
            }
        });
    }
}