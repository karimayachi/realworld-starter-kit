import { observable, computed, observe } from 'imagine';
import { get, deepCopyProperties, post, del } from '../helpers/helpers';
import { Article } from '../model/article';
import { app, TOKEN_IDENTIFIER } from '../index';
import { IObjectDidChange, IValueDidChange } from 'mobx';

const PAGE_SIZE = 10;

export class HomeViewModel {
    @observable html: string;
    @observable articles: Article[];
    @observable totalArticles: number;
    @observable tags: string[];
    @observable filter: string;
    @observable showFeed: boolean;
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
        this.showFeed = false;
        this.loadingArticles = true;
        this.loadingTags = true;

        fetch(`./views/home.html`).then((response: Response): void => {
            response.text().then((text: string): void => {
                this.html = text;
            });
        });

        if(app.loggedIn) {
            this.goToFeed();
        }
        else {
            this.getArticles();
        }

        observe(app, 'loggedIn', (change: IValueDidChange<boolean>): void => {
            if(change.newValue) {
                this.goToFeed();
            }
            else {
                this.clearFilter();
            }
        });

        get<string[]>('/tags', undefined, 'tags').then((tags: string[]): void => {
            this.tags = tags;
            this.loadingTags = false;
        });
    }

    @computed get showGlobal(): boolean {
        return !this.showFeed && this.filter === '';
    }

    @computed get pages(): { number: number, active: boolean }[] {
        let pages: { number: number, active: boolean }[] = [];
        for (let i = 0; i < this.totalArticles / PAGE_SIZE; i++) {
            pages.push({ number: i + 1, active: (i === this.currentPage) });
        }

        return pages;
    };

    logout = (): void => {
        app.user = undefined;
    }

    favoriteArticle = (article: Article): void => {
        if (!app.loggedIn) {
            document.location.href = '/#/login';
        }
        else if(article.favorited) {
            del<Article>(`/articles/${article.slug}/favorite`, {}, Article, 'article').then((newArticle: Article) => {
                article.favorited = newArticle.favorited;
                article.favoritesCount = newArticle.favoritesCount;
            });
        }
        else {
            post<Article>(`/articles/${article.slug}/favorite`, {}, Article, 'article').then((newArticle: Article) => {
                article.favorited = newArticle.favorited;
                article.favoritesCount = newArticle.favoritesCount;
            });
        }
    }

    public clearFilter = (_vm?: any, event?: Event): void => {
        event?.preventDefault(); // Should this be part of Imagine? Would that be too opinionated?
        this.currentPage = 0;
        this.filter = '';
        this.showFeed = false;
        this.getArticles(); // observing currentPage, filter and showFeed would be a better pattern than calling getArticles every time
    }

    public goToFeed = (_vm?: any, event?: Event): void => {
        event?.preventDefault(); // Should this be part of Imagine? Would that be too opinionated?
        this.currentPage = 0;
        this.filter = '';
        this.showFeed = true;
        this.getArticles(); // observing currentPage, filter and showFeed would be a better pattern than calling getArticles every time
    }

    public filterOnTag = (tag: string, event: Event): void => {
        event.preventDefault(); // Should this be part of Imagine? Would that be too opinionated?
        this.currentPage = 0;
        this.filter = tag;
        this.showFeed = false;
        this.getArticles(); // observing currentPage, filter and showFeed would be a better pattern than calling getArticles every time
    }

    public goToPage = (pageItem: { number: number, active: boolean }, event: Event): void => {
        event.preventDefault(); // Should this be part of Imagine? Would that be too opinionated?
        this.currentPage = pageItem.number - 1;
        this.getArticles(); // observing currentPage, filter and showFeed would be a better pattern than calling getArticles every time
    }

    private getArticles = (): void => {
        this.loadingArticles = true;
        let offset: number = this.currentPage * PAGE_SIZE;
        let showFeed: boolean = this.showFeed;
        let filter: string = this.filter;

        let endpoint: string = this.showFeed
            ? `https://conduit.productionready.io/api/articles/feed?limit=10&offset=${offset}`
            : `https://conduit.productionready.io/api/articles?limit=10&offset=${offset}${this.filter ? '&tag=' + this.filter : ''}`;

        let options: RequestInit = {};

        if (localStorage.getItem(TOKEN_IDENTIFIER) !== null) {
            options.headers = new Headers({
                'Authorization': 'Token ' + localStorage.getItem(TOKEN_IDENTIFIER)
            })
        }

        /* don't use the get-helper, because we also need 'articlesCount' in the same pass.. Maybe refactor helper later to support this */
        fetch(endpoint, options).then((response: Response): Promise<any> => {
            return response.json();
        }).then((data: any): void => {
            if(showFeed === this.showFeed && filter === this.filter) { // make sure there wasn't a different request in the mean time (e.g. when loggedIn state has changed)
                this.totalArticles = data.articlesCount;

                let articles: Article[] = [];
    
                for (let articleData of data.articles) {
                    let article: Article = new Article();
                    deepCopyProperties(articleData, article);
                    articles.push(article);
                }
    
                this.articles = articles;
                this.loadingArticles = false;
            }
        });
    }
}