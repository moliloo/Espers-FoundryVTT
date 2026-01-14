import { default as EspersItemSheet } from './item-sheet.mjs';
import { espers } from '../../helpers/config.mjs';

export default class EspersMagicArtsSheet extends EspersItemSheet {
    static DEFAULT_OPTIONS = {
        tag: 'form',
        classes: ['espers', 'sheet', 'item', 'magic-arts'],
        actions: {
            addAbility: this.#addAbility
        }
    };

    static PARTS = {
        header: {
            id: 'header',
            template: 'systems/espers/templates/sheets/items/margic-arts/header.hbs'
        },
        description: {
            template: 'systems/espers/templates/sheets/global/tabs/tab-description.hbs',
            scrollable: ['.description']
        },
        abilities: {
            id: 'abilities',
            template: 'systems/espers/templates/sheets/items/margic-arts/abilities.hbs'
        },
    };

    static TABS = {
        sheet: [
            { id: 'description', group: 'magic-arts', label: 'ESPERS.Item.tabs.description' },
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

    static async #addAbility() {
        const newAbility = {
            name: 'Ability',
            description: '',
            rankedAbilities: []
        };
        await this.item.update({ [`system.abilities.${foundry.utils.randomID()}`]: newAbility });
    }
}