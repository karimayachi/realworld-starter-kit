import { observable } from 'imagine';

export class EditArticleViewModel {
    @observable html: string;

    constructor() {
        this.html = '';

        fetch(`./views/editarticle.html`).then((response: Response): void => {
            response.text().then((text: string): void => {
                this.html = text;
            });
        });
    }
}