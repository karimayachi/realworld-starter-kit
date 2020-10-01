import { observable, computed } from 'imagine';
import { get, deepCopyProperties, del, post } from '../helpers/helpers';
import { Profile } from '../model/profile';
import { Article } from '../model/article';
import { app, TOKEN_IDENTIFIER } from '../index';
import { User } from 'model/user';

const PAGE_SIZE = 10;

export class ProfileViewModel {
    @observable html: string;
    @observable username: string;
    @observable profile?: Profile;
    @observable loading: boolean;
    @observable currentPage: number;
    @observable articles: Article[];
    @observable totalArticles: number;

    constructor(username?: string) {
        this.html = '';
        this.username = username || '';
        this.loading = true;
        this.articles = [];
        this.currentPage = 0;
        this.totalArticles = 0;

        fetch(`./views/profile.html`).then((response: Response): void => {
            response.text().then((text: string): void => {
                this.html = text;
            });
        });

        get<Profile>(`/profiles/${username}`, Profile, 'profile').then((profile: Profile): void => {
            this.profile = profile;
        });

        this.getArticles();
    }

    @computed get profileIsMe(): boolean {
        return app.user?.username === this.username;
    }

    public goToPage = (pageItem: { number: number, active: boolean }): void => {
        this.currentPage = pageItem.number - 1;
        this.getArticles();
    }

    followAuthor = (): void => {
        if (!app.loggedIn) {
            document.location.href = '/#/login';
        }
        else if(this.profile!.following) {
            del<Profile>(`/profiles/${this.profile!.username}/follow`, {}, Profile, 'profile').then((profile: Profile) => {
                this.profile = profile;
            });
        }
        else {
            post<Profile>(`/profiles/${this.profile!.username}/follow`, {}, Profile, 'profile').then((profile: Profile): void => {
                this.profile = profile;
            });
        }
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
    
    @computed get pages(): { number: number, active: boolean }[] {
        let pages: { number: number, active: boolean }[] = [];
        for (let i = 0; i < this.totalArticles / PAGE_SIZE; i++) {
            pages.push({ number: i + 1, active: (i === this.currentPage) });
        }

        return pages;
    };

    private getArticles = (): void => {
        this.loading = true;
        let offset: number = this.currentPage * PAGE_SIZE;

        let options: RequestInit = {};

        if (localStorage.getItem(TOKEN_IDENTIFIER) !== null) {
            options.headers = new Headers({
                'Authorization': 'Token ' + localStorage.getItem(TOKEN_IDENTIFIER)
            })
        }
        
        /* don't use the get-helper, because we also need 'articlesCount' in the same pass.. Maybe refactor helper later to support this */
        fetch(`https://conduit.productionready.io/api/articles?limit=10&offset=${offset}&author=${this.username}`, options).then((response: Response): Promise<any> => {
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
            this.loading = false;
        });
    }
}