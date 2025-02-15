import { espers } from '../../helpers/config.mjs';

export class EspersMonsterSheet extends ActorSheet {
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: ['espers', 'sheet', 'actor', 'monster'],
            width: 400,
            height: 300
            // tabs: [{ navSelector: '.tab-nav', contentSelector: '.tab-select', initial: 'description' }]
        });
    }

    get template() {
        return `systems/espers/templates/actors/monster/monster-sheet.hbs`;
    }

    getData() {
        const context = super.getData();
        const actorData = context.data;

        context.system = actorData.system;
        context.config = CONFIG.ESPERS;
        context.rollData = context.actor.getRollData();

        // context.effects = this.prepareActiveEffectCategories(this.actor.effects)

        // this._prepareItems(context)

        return context;
    }
}
