import { observable } from '../../../Imagine/dist';

export class HomeViewModel {
    @observable html: string;

    constructor() {
        this.html = '';

        fetch(`./views/home.html`).then((response: Response): void => {
            response.text().then((text: string): void => {
                this.html = text;
            });
        });
    }
}