import { observable, computed } from 'imagine';
import { get, deepCopyProperties } from '../helpers/helpers';
import { Article } from '../model/article';

const PAGE_SIZE = 10;

export class HomeViewModel {
    @observable html: string;
    @observable articles: Article[];
    @observable totalArticles: number;
    @observable tags: string[];
    @observable currentPage: number;

    @observable loadingArticles: boolean;
    @observable loadingTags: boolean;

    constructor() {
        this.html = '';
        this.articles = [];
        this.totalArticles = 0;
        this.currentPage = 0;
        this.tags = [];
        this.loadingArticles = true;
        this.loadingTags = true;

        fetch(`./views/home.html`).then((response: Response): void => {
            response.text().then((text: string): void => {
                this.html = text;
            });
        });

        this.getArticles(0);

        get<string[]>('/tags', undefined, 'tags').then((tags: string[]): void => {
            this.tags = tags;
            this.loadingTags = false;
        });
    }


    @computed get pages(): { number: number, active: boolean }[] {
        let pages: { number: number, active: boolean }[] = [];
        for (let i = 0; i < this.totalArticles / PAGE_SIZE; i++) {
            pages.push({ number: i + 1, active: (i === this.currentPage) });
        }

        return pages;
    };

    public goToPage = (pageItem: { number: number, active: boolean }): void => {
        this.currentPage = pageItem.number - 1;
        this.getArticles(pageItem.number - 1);
    }

    private getArticles = (page: number): void => {
        this.loadingArticles = true;
        let offset: number = page * PAGE_SIZE;

        /* don't use the get-helper, because we also need 'articlesCount' in the same pass.. Maybe refactor helper later to support this */
        fetch(`https://conduit.productionready.io/api/articles?limit=10&offset=${offset}`).then((response: Response): Promise<any> => {
            return response.json();
        }).then((data: any): void => {
            this.totalArticles = data.articlesCount;

            let articles: Article[] = [];

            for (let articleData of data.articles) {
                let article: Article = new Article();
                deepCopyProperties(articleData, article);
                articles.push(article);
            }

            this.articles = articles;
            this.loadingArticles = false;
        });
    }
}