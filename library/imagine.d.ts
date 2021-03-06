declare global {
    interface Array<T> {
        remove(o: T): Array<T>;
    }
}
export { observable, computed, observe } from 'mobx';
export declare const bind: (element: HTMLElement | DocumentFragment | null, vm: any, debug?: boolean | undefined) => void;
export declare const contexts: WeakMap<HTMLElement, Map<string, import("./binding/bindingContext").BindingContext>>;
export declare const scopes: Map<string, any>;
export declare const bindingEngine: import("./binding/bindingEngine").BindingEngine;
