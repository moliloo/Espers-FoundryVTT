import { espers } from '../helpers/config.mjs';

export class EspersCardSheet extends ItemSheet {
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: ['espers', 'sheet', 'item'],
            width: 350,
            height: 500
            // tabs: [{ navSelector: '.tab-nav', contentSelector: '.tab-select', initial: 'description' }]
        });
    }

    get template() {
        return `systems/espers/templates/items/cards/cards-sheet.hbs`;
    }

    getData() {
        const context = super.getData();

        // context.effects = this.prepareActiveEffectCategories(this.actor.effects)

        // this._prepareItems(context)

        return context;
    }
}
