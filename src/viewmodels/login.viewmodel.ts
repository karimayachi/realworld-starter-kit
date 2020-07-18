import { observable } from '../../../Imagine/dist';

export class LoginViewModel {
    @observable html: string;

    constructor() {
        this.html = '';

        fetch(`./views/login.html`).then((response: Response): void => {
            response.text().then((text: string): void => {
                this.html = text;
            });
        });
    }
}