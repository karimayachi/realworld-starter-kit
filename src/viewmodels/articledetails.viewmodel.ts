import { observable } from 'imagine';
import { get } from '../helpers/helpers';
import { Article } from '../model/article';
import { Comment } from '../model/comment';
import { Converter } from 'showdown';

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

        get<Comment[]>(`/articles/${slug}/comments`, Comment, 'comments').then((comments: Comment[]): void => {
            this.comments = comments;
        });
    }

    markdownToHTML = (text: string): string => {
        let converter: Converter = new Converter();
        return converter.makeHtml(text);
    }
}