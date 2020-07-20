import { BindingHandler } from './bindingHandlers';
import { BindingContext } from './bindingContext';
interface BindingHandlers {
    [key: string]: BindingHandler;
}
export declare class BindingEngine {
    static handlers: BindingHandlers;
    boundElements: WeakMap<HTMLElement, Map<string, BindingContext>>;
    scopes: Map<string, any>;
    constructor();
    parseBinding: (name: string, value: string, vm: any) => BindingProperties | null;
    bindInitPhase: (element: HTMLElement, bindingProperties: BindingProperties, vm: any) => void;
    bindUpdatePhase: (element: HTMLElement, bindingProperties: BindingProperties, vm: any) => void;
    private unwrap;
}
export interface BindingProperties {
    handler: string;
    parameter: string;
    propertyName: string;
    bindingValue: any;
}
export {};
