import { BindingContext } from './bindingContext';
import { IArraySplice, IArrayChange } from 'mobx';
export declare abstract class BindingHandler {
    abstract init?(element: HTMLElement, value: any, context: BindingContext, updateValue: (value: string) => void): void;
    abstract update?(element: HTMLElement, value: string, context: BindingContext, change?: any): void;
}
export declare class TextHandler implements BindingHandler {
    update(element: HTMLElement, value: string): void;
}
export declare class VisibleHandler implements BindingHandler {
    initialValue?: string;
    init: (element: HTMLElement) => void;
    update: (element: HTMLElement, value: string) => void;
}
export declare class ValueHandler implements BindingHandler {
    init(element: HTMLElement, _value: any, _contex: BindingContext, updateValue: (value: string) => void): void;
    update(element: HTMLElement, value: string): void;
}
export declare class EventHandler implements BindingHandler {
    init(element: HTMLElement, value: any, context: BindingContext): void;
}
export declare class AttributeHandler implements BindingHandler {
    update(element: HTMLElement, value: string, context: BindingContext): void;
}
export declare class ScopeHandler implements BindingHandler {
    init(_element: HTMLElement, value: any, context: BindingContext, _updateValue: (value: string) => void): void;
}
export declare class TransformHandler implements BindingHandler {
    init(_element: HTMLElement, value: any, context: BindingContext, _updateValue: (value: string) => void): void;
}
export declare class IfHandler implements BindingHandler {
    init(element: HTMLElement, _value: any, context: BindingContext, _updateValue: (value: string) => void): void;
    update(element: HTMLElement, value: string, context: BindingContext, _change: IArraySplice<any>): void;
}
export declare class ContextHandler implements BindingHandler {
    init(element: HTMLElement, _value: any, context: BindingContext, _updateValue: (value: string) => void): void;
    update(element: HTMLElement, value: string, context: BindingContext, change: IArraySplice<any>): void;
}
export declare class HtmlHandler implements BindingHandler {
    update(element: HTMLElement, value: string, context: BindingContext, change: IArraySplice<any>): void;
}
export declare class ForEachHandler implements BindingHandler {
    init(element: HTMLElement, _value: any, context: BindingContext, _updateValue: (value: string) => void): void;
    update(element: HTMLElement, value: any, context: BindingContext, change: IArraySplice<any> | IArrayChange): void;
}
