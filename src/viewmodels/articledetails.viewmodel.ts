import { observable } from 'imagine';
import { get } from '../helpers/helpers';
import { Article } from '../model/article';

export class ArticleDetailsViewModel {
    @observable html: string;
    @observable article?: Article;
    @observable comments: Comment[];

    constructor(slug?: string) {
        this.html = '';
        this.comments = [];

        fetch(`./views/articledetails.html`).then((response: Response): void => {
            response.text().then((text: string): void => {
                this.html = text;
            });
        });

        get<Article>(`/articles/${slug}`, Article, 'article').then((article: Article): void => {
            this.article = article;
        });

        get<Comment[]>(`/articles/${slug}/comments`, Comment, 'article').then((comments: Comment[]): void => {
            this.comments = comments;
        });
    }
}