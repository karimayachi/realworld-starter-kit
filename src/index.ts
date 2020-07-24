import { bind } from 'imagine';
import { MainViewModel } from './viewmodels/main.viewmodel';

bind(null, new MainViewModel(), true);