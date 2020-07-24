import { observable, computed } from 'imagine';
import { User } from './user';

export class Comment {
    @observable id: number;
    @observable body: string;
    @observable createdAt: Date;
    @observable author: User;

    constructor() {
        this.id = -1;
        this.body = '';
        this.createdAt = new Date();
        this.author = new User();
    }

    @computed get formattedDate(): string {
        return this.createdAt.toDateString();
    }
}