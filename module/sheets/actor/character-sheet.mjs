import { espers } from '../../helpers/config.mjs';
import { getDocFromElement } from '../../helpers/utils.mjs';
import EspersCharSetup from '../../setup/char-setup.mjs';
import EspersCharLevelup from '../../setup/char-level-up.mjs';

const { ActorSheetV2 } = foundry.applications.sheets;
const { HandlebarsApplicationMixin } = foundry.applications.api;

export default class EspersCharacterSheet extends HandlebarsApplicationMixin(ActorSheetV2) {
    static DEFAULT_OPTIONS = {
        tag: 'form',
        classes: ['espers', 'sheet', 'actor', 'character'],
        position: { width: 600, height: 660 },
        actions: {
            editImage: this.#onEditImage,
            createEffect: this.createActiveEffect,
            editEffect: this.editActiveEffect,
            deleteEffect: this.deleteActiveEffect,
            toggleEffect: this.toggleActiveEffect,
            deleteItem: this.#deleteItem,
            toggleEquipItem: this.#toggleEquipItem,
            consumeItem: this.#consumeItem,
            levelManagement: this.#levelManagement,
            editDoc: this.editDoc,
        },
        form: {
            handler: this.updateForm,
            submitOnChange: true,
            closeOnSubmit: false
        }
    };

    get title() {
        return this.actor.name;
    }

    static PARTS = {
        header: {
            id: 'header',
            template: 'systems/espers/templates/sheets/actors/actor/header.hbs'
        },
        tabs: {
            id: 'tabs',
            template: 'systems/espers/templates/sheets/global/tabs/tab-navigation.hbs'
        },
        magicArts: {
            template: 'systems/espers/templates/sheets/actors/actor/magic-arts.hbs',
            scrollable: ['.magicArts']
        },
        equipment: {
            template: 'systems/espers/templates/sheets/actors/actor/equipment.hbs',
            scrollable: ['.equipment']
        },
        notes: {
            template: 'systems/espers/templates/sheets/actors/actor/notes.hbs',
            scrollable: ['.notes']
        },
        effects: {
            template: 'systems/espers/templates/sheets/global/tabs/tab-effects.hbs',
            scrollable: ['.effects']
        }
    };

    static TABS = {
        sheet: [
            { id: 'magicArts', group: 'character', label: 'ESPERS.Item.tabs.magicArts' },
            { id: 'equipment', group: 'character', label: 'ESPERS.Item.tabs.equipment' },
            { id: 'notes', group: 'character', label: 'ESPERS.Item.tabs.notes' },
            { id: 'effects', group: 'character', label: 'ESPERS.Item.tabs.effects' }
        ]
    };

    async _prepareContext(_options) {
        return {
            actor: this.document,
            source: this.document.toObject(),
            config: espers,
            fields: this.document.system.schema.fields,
            effects: this.prepareActiveEffectCategories(this.actor.effects),
            tabs: this.prepareTabs(this.constructor.TABS).sheet,
            inventory: {
                artifacts: this.document.itemTypes.artifacts.sort((a, b) => a.sort - b.sort),
                base: this.document.itemTypes.base.sort((a, b) => a.sort - b.sort),
                consumables: this.document.itemTypes.consumable.sort((a, b) => a.sort - b.sort),
                equipment: this.document.itemTypes.equipment.sort((a, b) => a.sort - b.sort),
                gems: this.document.itemTypes.gems.sort((a, b) => a.sort - b.sort),
                general: this.document.itemTypes.general.sort((a, b) => a.sort - b.sort),
                magicArts: this.document.itemTypes.magicArts.sort((a, b) => a.sort - b.sort),
                throwable: this.document.itemTypes.throwable.sort((a, b) => a.sort - b.sort),
                weapons: this.document.itemTypes.weapon.sort((a, b) => a.sort - b.sort),
            }
        };
    }

    async _onDrop(event) {
        event.preventDefault();
        const data =  foundry.applications.ux.TextEditor.implementation.getDragEventData(event);
        if (!data || !data.type) return;

        const item = await Item.fromDropData(data);

        await this.actor.createEmbeddedDocuments('Item', [item.toObject()]);
    }

    static async #onEditImage(event) {
        const attr = event.target.dataset.edit;
        const current = foundry.utils.getProperty(this.document, attr);
        const fp = new FilePicker({
            current,
            type: 'image',
            callback: path => {
                event.target.src = path;
                if (this.options.form.submitOnChange) {
                    const submit = new Event('submit');
                    this.element.dispatchEvent(submit);
                }
            },
            top: this.position.top + 40,
            left: this.position.left + 10
        });
        await fp.browse();
    }

    static async updateForm(event, _, formData) {
        await this.document.update(formData.object);
        this.render();
    }

    prepareActiveEffectCategories(effects) {
        const categories = {
            temporary: {
                type: 'temporary',
                label: game.i18n.localize('ESPERS.ActiveEffect.temporary'),
                effects: []
            },
            passive: {
                type: 'passive',
                label: game.i18n.localize('ESPERS.ActiveEffect.passive'),
                effects: []
            },
            inactive: {
                type: 'inactive',
                label: game.i18n.localize('ESPERS.ActiveEffect.inactive'),
                effects: []
            }
        };

        for (let e of effects) {
            if (e.disabled) categories.inactive.effects.push(e);
            else if (e.isTemporary) categories.temporary.effects.push(e);
            else categories.passive.effects.push(e);
        }
        return categories;
    }

    getEffectId(event, item) {
        const effectId = event.target.closest('li').dataset.effectId;
        return effectId ? item.effects.get(effectId) : null;
    }

    static createActiveEffect(event) {
        const item = this.item;
        event.preventDefault();
        event.stopPropagation();

        const effectType = event.currentTarget.closest('li')?.dataset.effectType;
        item.createEmbeddedDocuments('ActiveEffect', [
            {
                name: game.i18n.format('DOCUMENT.New', {
                    type: game.i18n.localize('DOCUMENT.ActiveEffect')
                }),
                icon: item.img,
                origin: item.uuid,
                disabled: effectType === 'inactive'
            }
        ]);
    }

    static editActiveEffect(event) {
        const item = this.item;
        const effect = this.getEffectId(event, item);
        return effect.sheet.render(true);
    }

    static deleteActiveEffect(event) {
        const item = this.item;
        const effect = this.getEffectId(event, item);
        return effect.delete();
    }

    static toggleActiveEffect(event) {
        const item = this.item;
        const effect = this.getEffectId(event, item);
        effect.update({ disabled: !effect.disabled });
    }

    prepareTabs(tabsConstructor) {
        let tabs = {};

        Object.entries(tabsConstructor).forEach(([groupId, config]) => {
            tabs[groupId] = config.reduce((acc, tab) => {
                if (!this.tabGroups[tab.group]) this.tabGroups[tab.group] = tab.id;
                const isActive = this.tabGroups[tab.group] === tab.id;
                acc[tab.id] = { ...tab, active: isActive, cssClass: isActive ? 'active' : '' };
                return acc;
            }, {});
        });

        if (!game.user.isGM) delete tabs?.sheet?.hooks;

        return tabs;
    }

    static async #deleteItem(event, target) {
        const doc = await getDocFromElement(target.closest('.item'));
        if (!event.shiftKey) {
            const confirmed = await foundry.applications.api.DialogV2.confirm({
                window: {
                    title: game.i18n.format('ESPERS.Messages.delete.title', {
                        type: game.i18n.localize(`TYPES.Item.${doc.type}`),
                        name: doc.name
                    })
                },
                content: game.i18n.format('ESPERS.Messages.delete.text', { name: doc.name })
            });

            if (!confirmed) return;
        }

        this.document.deleteEmbeddedDocuments('Item', [doc.id]);
    }

    static async editDoc(_event, target) {
        const element = target.closest('[data-item-uuid]');
        const doc = (await foundry.utils.fromUuid(element.dataset.itemUuid)) ?? null;
        if (doc) return doc.sheet.render({ force: true });
    }

    static async #toggleEquipItem(_event, button) {
        const item = await getDocFromElement(button);
        if (!item) return;
        if (item.system.equipped) {
            await item.update({ 'system.equipped': false });
            return;
        }

        switch (item.type) {
            case 'weapon':
                const weapon = this.document.itemTypes.weapon.find(weapon => weapon.system.equipped === true);

                if (weapon && (item.id !== weapon.id)) await weapon.update({ 'system.equipped': false });

                await item.update({ 'system.equipped': true });
                break;
            case 'equipment':
                const equipment = this.document.itemTypes.equipment.find(equipment => equipment.system.equipped === true && equipment.system.type === item.system.type);

                if (equipment && (item.id !== equipment.id)) await equipment.update({ 'system.equipped': false });

                await item.update({ 'system.equipped': true });
                break;
        }
    }

    static async #consumeItem(_event, button)  {
        const item = await getDocFromElement(button);
        if (!item) return;

        if (item.system.quantity >= 1) {
            await item.update({ 'system.quantity': item.system.quantity-- });
        } else {
            this.document.deleteEmbeddedDocuments('Item', [item.id]);
        }

    }

    static async #levelManagement() {
        if (this.document.system.level < 1)
            return new EspersCharSetup(this.document).render({ force: true });

        new EspersCharLevelup(this.document).render({ force: true });
    }
}
