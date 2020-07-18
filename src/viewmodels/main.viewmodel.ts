import { observable } from '../../../Imagine/dist';
import { HomeViewModel } from './home.viewmodel';
import { LoginViewModel } from './login.viewmodel';
import { SettingsViewModel } from './settings.viewmodel';
import { EditArticleViewModel } from './editarticle.viewmodel';
import { ArticleDetailsViewModel } from './articledetails.viewmodel';

export class MainViewModel {
    @observable currentViewModel: any;
    @observable routes: Map<string, new (...args: any) => any>

    constructor() {
        this.currentViewModel = new HomeViewModel();
        this.routes = new Map<string, new (...args: any) => any>();

        this.routes.set('',  HomeViewModel);
        this.routes.set('login',  LoginViewModel);
        this.routes.set('settings',  SettingsViewModel);
        this.routes.set('article',  ArticleDetailsViewModel);
        this.routes.set('editor',  EditArticleViewModel);

        window.addEventListener('popstate', (_event: PopStateEvent): void => {
            let hash: string[] = window.location.hash.split('/');
            let route: string = hash[1];
            let params: string[] = hash.slice(2);

            if(this.routes.has(route)) {
                this.currentViewModel = new (this.routes.get(route)!)(...params);
            }
        });
    }
}