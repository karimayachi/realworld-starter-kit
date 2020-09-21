import './components/toggleButton';
import { bind } from 'imagine';
import { MainViewModel } from './viewmodels/main.viewmodel';

export const TOKEN_IDENTIFIER = '__ImagineApp__token';
export let app: MainViewModel = new MainViewModel();

app.changeView();

bind(null, app, true);