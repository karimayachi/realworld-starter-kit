import { observable } from 'imagine';
import { Article } from '../model/article';
import { get, put } from '../helpers/helpers';

export class EditArticleViewModel {
    @observable html: string;
    @observable article: Article;
    @observable errorMessages: string[];

    constructor(slug?: string) {
        this.html = '';
        this.article = new Article();
        this.errorMessages = [];

        fetch(`./views/editarticle.html`).then((response: Response): void => {
            response.text().then((text: string): void => {
                this.html = text;
            });
        });

        if(slug) {
            get<Article>(`/articles/${slug}`, Article, 'article').then((article: Article): void => {
                this.article = article;
            });
        }
    }

    save = (): void => {
        
        put('/articles/' + this.article.slug, { 
            article: this.article
        }).then((data: any) => {
            if(data.article) {
                console.log(data.article)
            }
            else if(data.errors) {
                for(let error in data.errors) {
                    this.errorMessages.push(`${error}: ${data.errors[error]}`);
                }
            }
        });
    }
}