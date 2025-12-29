import { default as EspersItemSheet } from './item-sheet.mjs';

export default class EspersConsumableSheet extends EspersItemSheet {
    static DEFAULT_OPTIONS = {
        tag: 'form',
        classes: ['espers', 'sheet', 'item', 'artifacts']
    };

    static PARTS = {
        header: {
            id: 'header',
            template: 'systems/espers/templates/sheets/global/header/sheet-item-header.hbs'
        },
        tabs: {
            id: 'tabs',
            template: 'systems/espers/templates/sheets/global/tabs/tab-navigation.hbs'
        },
        description: {
            template: 'systems/espers/templates/sheets/global/tabs/tab-description.hbs',
            scrollable: ['.description']
        },
        settings: {
            template: 'systems/espers/templates/sheets/global/settings/consumable-item-settings.hbs',
            scrollable: ['.settings']
        },
        effects: {
            template: 'systems/espers/templates/sheets/global/tabs/tab-effects.hbs',
            scrollable: ['.effects']
        }
    };
}
