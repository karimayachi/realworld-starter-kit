import { observable } from '../../../Imagine/dist';

export class User {
    @observable username: string;
    @observable bio: string;
    @observable image: string;
    @observable following: boolean;

    constructor() {
        this.username = '';
        this.bio = '';
        this.image = '';
        this.following = false;
    }
}