import { observable } from '../../../Imagine/dist';
import { HomeViewModel } from './home.viewmodel';
import { LoginViewModel } from './login.viewmodel';
import { SettingsViewModel } from './settings.viewmodel';

export class MainViewModel {
    @observable currentViewModel: any;

    constructor() {
        this.currentViewModel = new HomeViewModel();
    }

    goToLogin = (): void => {
        this.currentViewModel = new LoginViewModel();
    }

    goToSettings = (): void => {
        this.currentViewModel = new SettingsViewModel();
    }
}