import { default as EspersItemSheet } from './item-sheet.mjs';
import { espers } from '../../helpers/config.mjs';

export default class EspersMagicArtsSheet extends EspersItemSheet {
    static DEFAULT_OPTIONS = {
        tag: 'form',
        classes: ['espers', 'sheet', 'item', 'magic-arts'],
        actions: {
            addAbility: this.#addAbility,
            toggleExtended: this.#toggleExtended,
            addSkill: this.#addSkill,
            deleteSkill: this.#deleteSkill,
            deleteAbility: this.#deleteAbility,
        }
    };

    static PARTS = {
        header: {
            id: 'header',
            template: 'systems/espers/templates/sheets/items/margic-arts/header.hbs'
        },
        tabs: {
            id: 'tabs',
            template: 'systems/espers/templates/sheets/global/tabs/tab-navigation.hbs'
        },
        description: {
            template: 'systems/espers/templates/sheets/global/tabs/tab-description.hbs',
            scrollable: ['.description']
        },
        abilities: {
            id: 'abilities',
            template: 'systems/espers/templates/sheets/items/margic-arts/abilities.hbs'
        },
        skills: {
            id: 'skills',
            template: 'systems/espers/templates/sheets/items/margic-arts/skills.hbs'
        },
    };

    static TABS = {
        sheet: [
            { id: 'description', group: 'magic-arts', label: 'ESPERS.Item.tabs.description' },
            { id: 'abilities', group: 'magic-arts', label: 'ESPERS.Item.tabs.abilities' },
            { id: 'skills', group: 'magic-arts', label: 'ESPERS.Item.tabs.skills' },
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

    static async #addSkill() {
        const newSkill = {
            name: 'Skill',
            description: '',
            level: 1,
            damage: '1',
            rankType: 'novice',

        };
        await this.item.update({ [`system.skills.${foundry.utils.randomID()}`]: newSkill });
    }
    

    static async #deleteSkill(_, target) {
        const { id } = target.dataset;
        await this.item.update({ [`system.skills.-=${id}`]: null });
    }

    static async #deleteAbility(_, target) {
        const { id } = target.dataset;
        await this.item.update({ [`system.abilities.-=${id}`]: null });
    }

    static async #toggleExtended(_, target) {
        const container = target.closest('.espers-item');
        const extensible = container?.querySelector('.extensible');
        const header = container?.querySelector('.espers-item-header');

        extensible?.classList.toggle('extended');
        header?.classList.toggle('extended');
    }
}