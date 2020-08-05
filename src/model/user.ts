import { observable } from 'imagine';

export class User {
    @observable username: string;
    @observable bio: string;
    @observable image: string;
    @observable following: boolean;

    constructor(data?: any) {
        this.username = data?.username ?? '';
        this.bio = data?.bio ?? '';
        this.image = data?.image ?? '';
        this.following = data?.following ?? false;
    }
}