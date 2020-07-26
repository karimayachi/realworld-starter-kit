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
    parseBinding: (name: string, value: string, node: HTMLElement, vm: any) => BindingProperties | null;
    private resolveScopeAndCreateDependencyTree;
    private recursiveResolveScope;
    private rebind;
    bindInitPhase: (bindingProperties: BindingProperties, vm: any, rebind?: boolean) => void;
    bindUpdatePhase: (bindingProperties: BindingProperties, vm: any) => void;
    private unwrap;
}
export interface BindingProperties {
    handler: string;
    parameter: string;
    propertyName: string;
    bindingValue: any;
    element: HTMLElement;
}
export {};
