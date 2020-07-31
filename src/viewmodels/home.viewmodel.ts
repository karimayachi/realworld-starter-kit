import { observable, computed } from 'imagine';
import { get, deepCopyProperties } from '../helpers/helpers';
import { Article } from '../model/article';

const PAGE_SIZE = 10;

export class HomeViewModel {
    @observable html: string;
    @observable articles: Article[];
    @observable totalArticles: number;
    @observable tags: string[];
    @observable filter: string;
    @observable currentPage: number;

    @observable loadingArticles: boolean;
    @observable loadingTags: boolean;

    constructor() {
        this.html = '';
        this.articles = [];
        this.totalArticles = 0;
        this.currentPage = 0;
        this.filter = '';
        this.tags = [];
        this.loadingArticles = true;
        this.loadingTags = true;

        fetch(`./views/home.html`).then((response: Response): void => {
            response.text().then((text: string): void => {
                this.html = text;
            });
        });

        this.getArticles();

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

    public clearFilter = (): void => {
        this.currentPage = 0;
        this.filter = '';
        this.getArticles()
    }

    public filterOnTag = (tag: string): void => {
        this.currentPage = 0;
        this.filter = tag;
        this.getArticles()
    }

    public goToPage = (pageItem: { number: number, active: boolean }, event: Event): void => {
        event.preventDefault(); // Should this be part of Imagine? Would that be too opinionated?
        this.currentPage = pageItem.number - 1;
        this.getArticles();
    }

    private getArticles = (): void => {
        this.loadingArticles = true;
        let offset: number = this.currentPage * PAGE_SIZE;

        /* don't use the get-helper, because we also need 'articlesCount' in the same pass.. Maybe refactor helper later to support this */
        fetch(`https://conduit.productionready.io/api/articles?limit=10&offset=${offset}${this.filter ? '&tag=' + this.filter : ''}`).then((response: Response): Promise<any> => {
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