import { observable } from 'imagine';

export class Profile {
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