import { default as EspersItemSheet } from './item-sheet.mjs';
import { espers } from '../../helpers/config.mjs';

export default class EspersGeneralSheet extends EspersItemSheet {
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
            template: 'systems/espers/templates/sheets/global/settings/base-item-settings.hbs',
            scrollable: ['.settings']
        },
        effects: {
            template: 'systems/espers/templates/sheets/global/tabs/tab-effects.hbs',
            scrollable: ['.effects']
        }
    };

    static TABS = {
        sheet: [
            { id: 'description', group: 'artifact', label: 'ESPERS.Item.tabs.description' },
            { id: 'settings', group: 'artifact', label: 'ESPERS.Item.tabs.settings' },
            { id: 'effects', group: 'artifact', label: 'ESPERS.Item.tabs.effects' }
        ]
    };

    async _prepareContext(options) {
        return {
            item: this.document,
            source: this.document.toObject(),
            config: espers,
            tabs: this.prepareTabs(this.constructor.TABS).sheet,
            description: this.document.system.description,
            fields: this.document.system.schema.fields,
            effects: this.prepareActiveEffectCategories(this.item.effects)
        };
    }
}
