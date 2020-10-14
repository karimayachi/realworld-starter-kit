import { observable, computed } from 'imagine';
import { get, del, post } from '../helpers/helpers';
import { Article } from '../model/article';
import { Comment } from '../model/comment';
import { app } from '../index';
import { Converter } from 'showdown';
import { User } from '../model/user';

export class ArticleDetailsViewModel {
    @observable html: string;
    @observable article?: Article;
    @observable comments: Comment[];
    @observable newComment: Comment;

    constructor(slug?: string) {
        this.html = '';
        this.newComment = new Comment();
        this.comments = [];

        fetch(`./views/articledetails.html`).then((response: Response): void => {
            response.text().then((text: string): void => {
                this.html = text;
            });
        });

        get<Article>(`/articles/${slug}`, Article, 'article').then((article: Article): void => {
            this.article = article;
        });

        get<Comment[]>(`/articles/${slug}/comments`, Comment, 'comments').then((comments: Comment[]): void => {
            this.comments = comments;
        });
    }

    @computed get articleByMe(): boolean {
        return app.user?.username === this.article?.author.username;
    }

    deleteArticle = (): void => {
        del<Article>('/articles/' + this.article?.slug, {}).then((): void => {
            document.location.href = '/#/';
        });
    }

    postComment = (): void => {
        post<Comment>(`/articles/${this.article!.slug}/comments`, this.newComment, Comment, 'comment').then((comment: Comment): void => {
            this.comments.unshift(comment);
            this.newComment = new Comment();
        });
    }

    deleteComment = (comment: Comment): void => {
        del<Comment>(`/articles/${this.article!.slug}/comments/${comment.id}`, {}, Comment).then((): void => {
            this.comments.remove(comment);
        });
    }

    followAuthor = (): void => {
        if (!app.loggedIn) {
            document.location.href = '/#/login';
        }
        else if(this.article?.author.following) {
            del<User>(`/profiles/${this.article!.author.username}/follow`, {}, User, 'profile').then((author: User) => {
                this.article!.author = author;
            });
        }
        else {
            post<User>(`/profiles/${this.article!.author.username}/follow`, {}, User, 'profile').then((author: User): void => {
                this.article!.author = author;
            });
        }
    }

    favoriteArticle = (): void => {
        if (!app.loggedIn) {
            document.location.href = '/#/login';
        }
        else if(this.article?.favorited) {
            del<Article>(`/articles/${this.article!.slug}/favorite`, {}, Article, 'article').then((article: Article) => {
                this.article = article;
            });
        }
        else {
            post<Article>(`/articles/${this.article!.slug}/favorite`, {}, Article, 'article').then((article: Article) => {
                this.article = article;
            });
        }
    }

    markdownToHTML = (text: string): string => {
        let converter: Converter = new Converter();
        return converter.makeHtml(text);
    }
}