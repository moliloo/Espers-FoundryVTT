import { espers } from '../../helpers/config.mjs';

export class EspersCharacterSheet extends ActorSheet {
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: ['espers', 'sheet', 'actor', 'character'],
            width: 600,
            height: 660
            // tabs: [{ navSelector: '.tab-nav', contentSelector: '.tab-select', initial: 'description' }]
        });
    }

    get template() {
        return `systems/espers/templates/actors/actor/character-sheet.hbs`;
    }

    getData() {
        const context = super.getData();
        const actorData = context.data;

        context.system = actorData.system;
        context.config = CONFIG.ESPERS;
        context.rollData = context.actor.getRollData();

        // context.effects = this.prepareActiveEffectCategories(this.actor.effects)

        this._prepareItems(context);

        return context;
    }

    async _prepareItems(event) {
        // Inicializa os containers
        const consumable = [];
        const equipment = [];
        const aether = [];
        const fate = [];

        // Itera pelos itens e aloca nos containers apropriados
        for (let i of event.items) {
            i.img = i.img || Item.DEFAULT_ICON;

            switch (i.type) {
                case 'consumable':
                    consumable.push(i);
                    break;
                case 'equipment':
                    equipment.push(i);
                    break;
                case 'card': // Para itens do tipo carta
                    if (i.system.location === 'aether') {
                        aether.push(i);
                    } else if (i.system.location === 'fate') {
                        fate.push(i);
                    } else {
                        console.warn(`Card not located: ${i.name}`);
                    }
                    break;
                default:
                    console.warn(`Unexpected type: ${i.type}`);
            }
        }

        // Armazena os dados no ator
        event.consumable = consumable;
        event.equipment = equipment;
        event.aether = aether;
        event.fate = fate;
    }
}
