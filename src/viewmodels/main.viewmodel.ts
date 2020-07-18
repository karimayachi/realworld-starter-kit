import { observable } from '../../../Imagine/dist';
import { HomeViewModel } from './home.viewmodel';
import { LoginViewModel } from './login.viewmodel';

export class MainViewModel {
    @observable currentViewModel: any;

    constructor() {
        this.currentViewModel = new HomeViewModel();
    }

    goToLogin = (): void => {
        this.currentViewModel = new LoginViewModel();
    }
}