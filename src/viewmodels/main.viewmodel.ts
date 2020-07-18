import { observable } from '../../../Imagine/dist';
import { HomeViewModel } from './home.viewmodel';

export class MainViewModel {
    @observable currentViewModel: any;

    constructor() {
        this.currentViewModel = new HomeViewModel();
    }
}