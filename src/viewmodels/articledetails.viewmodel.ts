import { observable } from 'imagine';

export class ArticleDetailsViewModel {
    @observable html: string;

    constructor(slug?: string) {
        this.html = '';

        fetch(`./views/articledetails.html`).then((response: Response): void => {
            response.text().then((text: string): void => {
                this.html = text;
            });
        });
    }
}