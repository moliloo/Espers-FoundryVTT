const { HandlebarsApplicationMixin, ApplicationV2 } = foundry.applications.api;
import { getStandardDeck, shuffle } from "../helpers/card-generator.mjs";

export default class EspersCharSetup extends HandlebarsApplicationMixin(ApplicationV2) {
    constructor(character) {
        super({});

        this.character = character;

        this.setup = {
            stat: {
                strength: 0,
                intelligence: 0,
                charisma: 0,
                dexterity: 0,
            },
            magicArts: {},
            weapon: {},
            fate: []
        }

        this._dragDrop = this._createDragDropHandlers();
    }

    get title() {
        return 'Character Creation';
    }

    statStack = {
        avarage: [6, 6, 6, 6],
        focused: [6, 4, 4, 10],
        specialty: [4, 4, 8, 8],
    }

    static DEFAULT_OPTIONS = {
        tag: 'form',
        classes: ['espers', 'dialog', 'character-creation'],
        position: { width: 600, height: 'auto' },
        actions: {
            generateFate: this.generateFate,
            finishSetup: this.finishSetup,
        },
        form: {
            handler: this.updateForm,
            submitOnChange: true,
            closeOnSubmit: false
        },
        dragDrop: [
            { dragSelector: null, dropSelector: '.magic-arts-drop' },
            { dragSelector: null, dropSelector: '.weapon-drop' },
        ]
    };

    static PARTS = {
        form: { template: 'systems/espers/templates/setup/char-setup/char-setup.hbs' }
    }

    static async updateForm(event, _, formData) {
        this.setup = foundry.utils.mergeObject(this.setup, formData.object);
        this.render();
    }

    async _prepareContext(_options) {
        return {
            statStack: this.statStack,
            setup: this.setup,
        };
    }

    static async generateFate(amount = 20) {
        let deck = getStandardDeck();
        shuffle(deck)
        let fate = deck.slice(0,20);

        this.setup.fate = fate
    }

    _createDragDropHandlers() {
        return this.options.dragDrop.map(d => {
            d.callbacks = {
                dragstart: this._onDragStart.bind(this),
                drop: this._onDrop.bind(this)
            };
            return new foundry.applications.ux.DragDrop.implementation(d);
        });
    }

    _attachPartListeners(partId, htmlElement, options) {
        super._attachPartListeners(partId, htmlElement, options);

        this._dragDrop.forEach(d => d.bind(htmlElement));
    }

    async _onDragStart(event) {
        const target = event.currentTarget;

        event.dataTransfer.setData('text/plain', JSON.stringify(target.dataset));
        event.dataTransfer.setDragImage(target, 60, 0);
    }

    async _onDrop(event) {
        const data = foundry.applications.ux.TextEditor.implementation.getDragEventData(event);
        const item = await foundry.utils.fromUuid(data.uuid);
        if (item.type === 'magicArts') {
            this.setup.magicArts = {
                ...item,
                effects: Array.from(item.effects).map(x => x.toObject()),
                uuid: item.uuid
            };
        } else if (item.type === 'weapon') {
            this.setup.weapon = {
                ...item,
                effects: Array.from(item.effects).map(x => x.toObject()),
                uuid: item.uuid
            };
        }

        this.render();
    }

    static async finishSetup(_, button) {
        button.disabled = true;

        this.character.update({
            "system.cards.fate": this.setup.fate,
            "system.attributes.strength": this.setup.stat.strength,
            "system.attributes.intelligence": this.setup.stat.intelligence,
            "system.attributes.dexterity": this.setup.stat.dexterity,
            "system.attributes.charisma": this.setup.stat.charisma,
            "system.level": 1,
        })

        await this.character.createEmbeddedDocuments('Item', [this.setup.weapon]);
        await this.character.createEmbeddedDocuments('Item', [this.setup.magicArts]);

        this.close();
    }
}