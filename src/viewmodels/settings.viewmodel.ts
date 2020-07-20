import { observable } from '../../library/imagine';

export class SettingsViewModel {
    @observable html: string;

    constructor() {
        this.html = '';

        fetch(`./views/settings.html`).then((response: Response): void => {
            response.text().then((text: string): void => {
                this.html = text;
            });
        });
    }
}