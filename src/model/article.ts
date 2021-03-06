import { observable, computed } from 'imagine';
import { User } from './user';

export class Article {
    @observable slug: string;
    @observable title: string;
    @observable description: string;
    @observable body: string;
    @observable tagList: string[];
    @observable favorited: boolean;
    @observable favoritesCount: number;
    @observable createdAt: Date;
    @observable author: User;

    constructor() {
        this.slug = '';
        this.title = '';
        this.description = '';
        this.body = '';
        this.tagList = [];
        this.favorited = false;
        this.favoritesCount = 0;
        this.createdAt = new Date();
        this.author = new User();
    }

    @computed get formattedDate(): string {
        return this.createdAt.toDateString();
    }
}