import { Datepicker, MultiSelect, Overflow, PlainTextInput, RadioButtons, Select } from '@slack/types';
import { Button, Checkboxes, Option } from '@slack/bolt';
import { Nullable } from './types';

/**
 * Options to create new input block
 */
export interface InputBlockOptions {
    blockId: string | undefined;
    element: Select | MultiSelect | Datepicker | PlainTextInput | RadioButtons | Checkboxes;
    optional: boolean;
    label: string;
}

/**
 * Options to create a new checkboxes input block
 */
export interface CheckboxesInputBlockOptions {
    label: string;
    checkboxes: Checkboxes;
    blockId: Nullable<string>;
    optional: boolean;
}

/**
 * Options to create new checkboxes
 */
export interface CheckboxesOptions {
    options: Option[];
    actionId: string;
    initialOptions: Option[];
}

export interface SectionBlockOptions {
    text: string;
    blockId?: string;
    accessory?: Button | Overflow;
}

export interface UrlButtonOptions {
    label: string;
    url: string;
    actionId: string;
}

export interface ValueButtonOptions {
    label: string;
    value: string;
}

export interface ActionButtonOptions {
    label: string;
    value: string;
    actionId: string;
}

export interface PlainTextInputElementOptions {
    actionId: string;
    isMultiline: boolean;
    initialValue: string | undefined;
}

export interface StaticSelectOptions {
    placeHolder: string;
    actionId: string;
    options: Array<Option>;
    initialOption: Option | undefined;
}

export interface StaticSelectInputBlockOptions {
    placeHolder: string;
    actionId: string;
    label: string;
    options: Array<Option>;
    blockId: string | undefined;
    initialOption: Option | undefined;
    dispatchAction: boolean;
}

export interface PlainTextInputBlockOptions {
    actionId: string;
    isMultiline: boolean;
    label: string;
    initialValue?: string;
    blockId: string | undefined;
    isOptional: boolean;
}

export interface SectionWithOverflowOptions {
    label: string;
    blockId: string;
    options: Array<Option>;
    actionId: string;
}

/**
 * Options to create a new multi user select input block
 */
export interface MultiUserSelectInputBlockOptions {
    label: string;
    placeHolderLabel: string;
    actionId: string;
    initialUsers: Array<string> | undefined;
    blockId: string | undefined;
    optional: boolean;
}
