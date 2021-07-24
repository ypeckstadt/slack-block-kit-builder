import {
    Button,
    Checkboxes,
    DividerBlock,
    HeaderBlock,
    MrkdwnElement,
    Option,
    PlainTextElement,
    SectionBlock,
    SlackViewAction,
    ViewOutput,
} from '@slack/bolt';
import {
    ActionsBlock,
    InputBlock,
    KnownBlock,
    MessageAttachment,
    Overflow,
    PlainTextInput,
    Select,
} from '@slack/types';
import { Nullable } from './types';
import {
    ActionButtonOptions,
    CheckboxesInputBlockOptions,
    CheckboxesOptions,
    InputBlockOptions,
    MultiUserSelectInputBlockOptions,
    PlainTextInputBlockOptions,
    PlainTextInputElementOptions,
    SectionBlockOptions,
    SectionWithOverflowOptions,
    StaticSelectInputBlockOptions,
    StaticSelectOptions,
    UrlButtonOptions,
    ValueButtonOptions,
} from './interface';

export abstract class BlockKitBuilder {
    private constructor() {}

    /**
     * Create a new PlaintTextElement
     * @param value
     */
    static plainTextElement(value: string): PlainTextElement {
        return {
            type: 'plain_text',
            text: value,
            emoji: true,
        };
    }

    /**
     * Create a new MarkDownElement
     * @param value
     */
    static markdownElement(value: string): MrkdwnElement {
        return {
            type: 'mrkdwn',
            text: value,
        };
    }

    /**
     * Create a new divider
     */
    static divider(): DividerBlock {
        return {
            type: 'divider',
        };
    }

    /**
     * Create a new input block with element
     * @param options
     */
    static inputBlock(options: InputBlockOptions): InputBlock {
        return {
            block_id: options.blockId,
            type: 'input',
            optional: options.optional,
            element: options.element,
            label: BlockKitBuilder.plainTextElement(options.label),
        };
    }

    /**
     * Create a new input block containing checkboxes
     * @param options
     */
    static checkboxesInputBlock(options: CheckboxesInputBlockOptions): KnownBlock {
        return BlockKitBuilder.inputBlock({
            blockId: options.blockId,
            element: options.checkboxes,
            optional: options.optional,
            label: options.label,
        });
    }

    /**
     * Create new checkboxes
     * @param options
     */
    static checkboxes(options: CheckboxesOptions): Checkboxes {
        const checkboxes: Checkboxes = {
            type: 'checkboxes',
            options: options.options,
            action_id: options.actionId,
        };

        // Cannot pass an empty array as initial options
        if (options.initialOptions && options.initialOptions.length > 0) {
            checkboxes.initial_options = options.initialOptions;
        }

        return checkboxes;
    }

    /**
     * Create a new section block
     * @param options
     */
    static sectionBlock(options: SectionBlockOptions): SectionBlock {
        const section: SectionBlock = {
            type: 'section',
            text: BlockKitBuilder.markdownElement(options.text),
        };

        if (options.blockId) {
            section.block_id = options.blockId;
        }

        if (options.accessory) {
            section.accessory = options.accessory;
        }
        return section;
    }

    /**
     * Create a new empty array to fill with blocks
     */
    static blocks(): Array<KnownBlock> {
        return new Array<KnownBlock>();
    }

    /**
     * Create a new array to fill with attachments
     */
    static attachments(): Array<MessageAttachment> {
        return new Array<MessageAttachment>();
    }

    /**
     * Create a new URL button
     * @param options
     */
    static urlButton(options: UrlButtonOptions): Button {
        return {
            type: 'button',
            text: BlockKitBuilder.plainTextElement(options.label),
            url: options.url,
            action_id: options.actionId,
        };
    }

    /**
     * Create a new value button
     * @param options
     */
    static valueButton(options: ValueButtonOptions): Button {
        return {
            type: 'button',
            text: BlockKitBuilder.plainTextElement(options.label),
            value: options.value,
        };
    }

    /**
     * Create a new action button
     * @param options
     */
    static actionButton(options: ActionButtonOptions): Button {
        return {
            type: 'button',
            text: BlockKitBuilder.plainTextElement(options.label),
            value: options.value,
            action_id: options.actionId,
        };
    }

    /**
     * Create a new option
     * @param text
     * @param value
     */
    static option(text: string, value: string): Option {
        return {
            text: BlockKitBuilder.plainTextElement(text),
            value: value,
        };
    }

    /**
     * Create a new plain text input element
     * @param options
     */
    static plainTextInputElement(options: PlainTextInputElementOptions): PlainTextInput {
        return {
            type: 'plain_text_input',
            multiline: options.isMultiline,
            action_id: options.actionId,
            initial_value: options.initialValue,
        };
    }

    /**
     * Creat a new actions block with buttons
     * @param buttons
     */
    static actions(buttons: Array<Button>): ActionsBlock {
        return {
            type: 'actions',
            elements: buttons,
        };
    }

    /**
     * Create a new input block containing a static select
     * @param options
     */
    static staticSelectInputBlock(options: StaticSelectInputBlockOptions): InputBlock {
        return {
            block_id: options.blockId,
            type: 'input',
            dispatch_action: options.dispatchAction,
            element: BlockKitBuilder.staticSelect({
                placeHolder: options.placeHolder,
                options: options.options,
                actionId: options.actionId,
                initialOption: options.initialOption,
            }),
            label: BlockKitBuilder.plainTextElement(options.label),
        };
    }

    /**
     * Create a new static select
     * @param options
     */
    static staticSelect(options: StaticSelectOptions): Select {
        return {
            type: 'static_select',
            placeholder: BlockKitBuilder.plainTextElement(options.placeHolder),
            options: options.options,
            action_id: options.actionId,
            initial_option: options.initialOption,
        };
    }

    /**
     * Create a new input block containing a plain text input element
     * @param options
     */
    static plainTextInputBlock(options: PlainTextInputBlockOptions): InputBlock {
        return {
            block_id: options.blockId,
            type: 'input',
            element: BlockKitBuilder.plainTextInputElement({
                actionId: options.actionId,
                isMultiline: options.isMultiline,
                initialValue: options.initialValue,
            }),
            label: BlockKitBuilder.plainTextElement(options.label),
            optional: options.isOptional,
        };
    }

    /**
     * Create a new overflow
     * @param options
     * @param actionId
     */
    static overflow(options: Array<Option>, actionId: string): Overflow {
        return {
            type: 'overflow',
            options: options,
            action_id: actionId,
        };
    }

    /**
     * Create a new section containing an overflow
     * @param options
     */
    static sectionWithOverflow(options: SectionWithOverflowOptions): SectionBlock {
        return BlockKitBuilder.sectionBlock({
            text: options.label,
            blockId: options.blockId,
            accessory: BlockKitBuilder.overflow(options.options, options.actionId),
        });
    }

    /**
     * Create a new header block
     * @param label
     */
    static headerBlock(label: string): HeaderBlock {
        // The max character limit on a header block is 150
        if (label.length > 150) {
            throw new Error('must be less than 151 characters');
        }
        return {
            type: 'header',
            text: BlockKitBuilder.plainTextElement(label),
        };
    }

    /**
     * Create a new input block containing a multi user select input
     * @param options
     */
    static multiUserSelectInputBlock(options: MultiUserSelectInputBlockOptions): InputBlock {
        return {
            type: 'input',
            element: {
                type: 'multi_users_select',
                placeholder: BlockKitBuilder.plainTextElement(options.placeHolderLabel),
                action_id: options.actionId,
                initial_users: options.initialUsers,
            },
            label: BlockKitBuilder.plainTextElement(options.label),
            block_id: options.blockId,
            optional: options.optional,
        };
    }

    /**
     * Retrieve the text input value from a text input component inside a view state
     * @param view
     * @param blockId
     * @param actionId
     */
    static getTextInputValue(view: ViewOutput, blockId: string, actionId: string): Nullable<string> {
        if (!BlockKitBuilder.containsBlockActionValue(view, blockId, actionId)) {
            return undefined;
        }
        return view.state.values[blockId][actionId].value as Nullable<string>;
    }

    /**
     * Retrieve the selected value from a multi user select component inside a view state
     * @param view
     * @param blockId
     * @param actionId
     */
    static getMultiUserSelectValue(view: ViewOutput, blockId: string, actionId: string): Nullable<Array<string>> {
        if (!BlockKitBuilder.containsBlockActionValue(view, blockId, actionId)) {
            return [];
        }
        return view.state.values[blockId][actionId].selected_users as Nullable<string[]>;
    }

    /**
     * Get value of selected checkboxes group
     * @param body
     * @param blockId
     * @param actionId
     */
    static getCheckboxesValues(body: SlackViewAction, blockId: string, actionId: string): Array<string> {
        const options = body.view.state.values[blockId][actionId].selected_options;
        const selectedValues = [];

        if (options && options.length > 0) {
            for (const option of options) {
                selectedValues.push(option.value);
            }
        }
        return selectedValues;
    }

    /**
     * Get the selected checkboxes values from a view state
     * @param view
     * @param blockId
     * @param actionId
     */
    static getCheckboxesValuesMap(view: ViewOutput, blockId: string, actionId: string): Map<string, boolean> {
        const options = view.state.values[blockId][actionId].selected_options;
        const map = new Map<string, boolean>();

        if (options && options.length > 0) {
            for (const option of options) {
                map.set(option.value, true);
            }
        }
        return map;
    }

    /**
     * Get selected value of a static select
     * @param view
     * @param blockId
     * @param actionId
     */
    static getStaticSelectValue(view: ViewOutput, blockId: string, actionId: string): Nullable<string> {
        if (
            !view.state.values[blockId] ||
            !view.state.values[blockId][actionId] ||
            !view.state.values[blockId][actionId].selected_option
        ) {
            return '';
        }
        return view.state.values[blockId][actionId].selected_option?.value;
    }

    /**
     * Check if the view state contains the block action value
     * @param view
     * @param blockId
     * @param actionId
     */
    static containsBlockActionValue(view: ViewOutput, blockId: string, actionId: string): boolean {
        if (!view.state || !view.state.values) {
            return false;
        }
        return !(!view.state.values[blockId] || !view.state.values[blockId][actionId]);
    }
}
