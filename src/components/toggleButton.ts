import { _allowStateChangesInsideComputed } from 'mobx';

export class ToggleButton extends HTMLElement {

    private _active: boolean;
    private _title: string;
    private _activeTitle: string;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this._active = this.hasAttribute('active');
        this._title = this.hasAttribute('title') ? this.getAttribute('title')! : '';
        this._activeTitle = this.hasAttribute('activetitle') ? this.getAttribute('activetitle')! : '';
    }

    static get observedAttributes() { return ['active'] };

    get title() { return this._title; }
    set title(value: string) {
        this._title = value;
        if (!this._active) {
            this._render();
        }
    }

    get activeTitle() { return this._activeTitle; }
    set activeTitle(value: string) {
        this._activeTitle = value;
        if (this._active) {
            this._render();
        }
    }

    get active() { return this._active; }
    set active(value: boolean) {
        if (value) {
            this.setAttribute('active', '');
        }
        else {
            this.removeAttribute('active');
        }

        this._render();
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if(name === 'active') {
            this._active = newValue !== null;
        }
    }

    connectedCallback() {
        this._render();
    }

    private _render() {
        this.shadowRoot!.innerHTML = `
<style>
    button {
        font-family: source sans pro,sans-serif;
        padding: .25rem .5rem;
        font-size: .875rem;
        border-radius: .2rem;
        display: inline-block;
        font-weight: 400;
        line-height: 1.25;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        cursor: pointer;
        user-select: none;
        border: 1px solid transparent;
        margin: 0;
        touch-action: manipulation;
        text-transform: none;
        overflow: visible;
        color: var(--toggle-button-text, #373a3c);
        background-color: var(--toggle-button-background, #fff);
        border-color: var(--toggle-button-border, #ccc);
    }

    .outline {
        color: var(--toggle-button-border, #ccc);
        background-color: transparent;
        border-color: var(--toggle-button-border, #ccc);
    }

    button:hover {
        color: var(--toggle-button-text, #fff);
        background-color: var(--toggle-button-hover-background, #ccc);
        border-color: var(--toggle-button-hover-background, #ccc);
    }

    button.outline:hover {
        color: var(--toggle-button-text, #fff);
        background-color: var(--toggle-button-background, #ccc);
        border-color: var(--toggle-button-border, #ccc);
    }
</style>
        
<button class="${this.active ? '' : 'outline'}">
    <slot name="icon"></slot>&nbsp; ${this.active ? this.activeTitle : this.title}
</button>
        `;
    }
}

customElements.define('toggle-button', ToggleButton);