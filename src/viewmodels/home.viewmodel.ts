import { observable } from '../../library/imagine';
import { get } from '../helpers/helpers';
import { Article } from '../model/article';

export class HomeViewModel {
    @observable html: string;
    @observable articles: Article[];
    @observable tags: string[];

    @observable loadingArticles: boolean;
    @observable loadingTags: boolean;

    constructor() {
        this.html = '';
        this.articles = [];
        this.tags = [];
        this.loadingArticles = true;
        this.loadingTags = true;

        fetch(`./views/home.html`).then((response: Response): void => {
            response.text().then((text: string): void => {
                this.html = text;
            });
        });

        get<Article[]>('/articles', Article, 'articles').then((articles: Article[]): void => {
            this.articles = articles;
            this.loadingArticles = false;
        });

        get<string[]>('/tags', undefined, 'tags').then((tags: string[]): void => {
            this.tags = tags;
            this.loadingTags = false;
        });
    }
}