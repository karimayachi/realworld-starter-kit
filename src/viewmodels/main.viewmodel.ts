import { observable, computed } from 'imagine';
import { HomeViewModel } from './home.viewmodel';
import { LoginViewModel } from './login.viewmodel';
import { SettingsViewModel } from './settings.viewmodel';
import { EditArticleViewModel } from './editarticle.viewmodel';
import { ArticleDetailsViewModel } from './articledetails.viewmodel';
import { ProfileViewModel } from './profile.viewmodel';
import { User } from '../model/user';
import { TOKEN_IDENTIFIER } from '../index';
import { get } from '../helpers/helpers';

export class MainViewModel {
    @observable currentViewModel: any;
    @observable routes: Map<string, { vm: new (...args: any) => any, options?: string[] }>;
    @observable user?: User;

    constructor() {
        this.routes = new Map<string, { vm: new (...args: any) => any, options?: any }>();

        this.routes.set('', { vm: HomeViewModel });
        this.routes.set('login', { vm: LoginViewModel });
        this.routes.set('register', { vm: LoginViewModel, options: ['register'] });
        this.routes.set('settings', { vm: SettingsViewModel });
        this.routes.set('article', { vm: ArticleDetailsViewModel });
        this.routes.set('editor', { vm: EditArticleViewModel });
        this.routes.set('profile', { vm: ProfileViewModel });

        window.addEventListener('popstate', this.changeView);

        if (localStorage.getItem(TOKEN_IDENTIFIER) !== null) {
            get<User>('/user', User, 'user').then((user: User): void => {
                this.user = user;
            });
        }
    }

    @computed get loggedIn(): boolean {
        return this.user !== undefined;
    }

    public changeView = (_event?: PopStateEvent): void => {
        let hash: string[] = window.location.hash.split('/');
        let route: string = hash[1] || '';
        let params: string[] = hash.slice(2);
        
        if (this.routes.has(route)) {
            let routeObject = this.routes.get(route)!;

            if(routeObject.options) {
                params.unshift(...routeObject.options);
            }

            this.currentViewModel = new (routeObject.vm)(...params);
        }
    };
}