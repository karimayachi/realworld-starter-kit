import { observable } from 'imagine';

export class User {
    @observable username: string;
    @observable email: string;
    @observable bio: string;
    @observable image: string;
    @observable following: boolean;

    constructor(data?: any) {
        this.username = data?.username ?? '';
        this.bio = data?.bio ?? '';
        this.image = data?.image ?? 'https://static.productionready.io/images/smiley-cyrus.jpg';
        this.following = data?.following ?? false;
        this.email = data?.email ?? '';
    }
}