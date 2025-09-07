import { espers } from '../../helpers/config.mjs';

const { ActorSheetV2 } = foundry.applications.sheets;
const { HandlebarsApplicationMixin } = foundry.applications.api;

export default class EspersCharacterSheet extends HandlebarsApplicationMixin(ActorSheetV2) {
    static DEFAULT_OPTIONS = {
        tag: 'form',
        classes: ['espers', 'sheet', 'actor', 'character'],
        position: { width: 600, height: 660 }
    };

    get title() {
        return this.actor.name;
    }

    static PARTS = {
        form: {
            id: 'form',
            template: 'systems/espers/templates/sheets/actors/actor/character-sheet.hbs'
        }
    };

    async _prepareContext(options) {
        return {
            actor: this.document,
            source: this.document.toObject()
            // tabs: this.prepareTabs(this.constructor.TABS).sheet
        };
    }

    async _onDrop(event) {
        event.preventDefault();
        const data = TextEditor.getDragEventData(event);
        if (!data || !data.type) return;

        const item = await Item.fromDropData(data);

        await this.actor.createEmbeddedDocuments('Item', [item.toObject()]);
    }
}
