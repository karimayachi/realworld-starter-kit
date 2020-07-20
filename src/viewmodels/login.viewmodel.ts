import { observable } from '../../library/imagine';

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