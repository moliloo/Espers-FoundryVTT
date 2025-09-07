import { espers } from '../../helpers/config.mjs';

const { ActorSheetV2 } = foundry.applications.sheets;
const { HandlebarsApplicationMixin } = foundry.applications.api;

export default class EspersMonsterSheet extends HandlebarsApplicationMixin(ActorSheetV2) {
    static DEFAULT_OPTIONS = {
        tag: 'form',
        classes: ['espers', 'sheet', 'actor', 'monster'],
        position: { width: 400, height: 300 }
    };

    get title() {
        return this.actor.name;
    }

    static PARTS = {
        form: {
            id: 'form',
            template: 'systems/espers/templates/sheets/actors/monster/monster-sheet.hbs'
        }
    };
}
