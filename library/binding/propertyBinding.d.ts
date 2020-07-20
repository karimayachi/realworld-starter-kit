import { BindingHandler } from './bindingHandlers';
import { BindingContext } from './bindingContext';
import { IArraySplice } from 'mobx';
export declare class PropertyHandler implements BindingHandler {
    init(element: HTMLElement, _value: any, context: BindingContext, updateValue: (value: any) => void): void;
    update(element: HTMLElement, value: string, context: BindingContext, change: IArraySplice<any>): void;
}
