import { espers } from '../../helpers/config.mjs';

const { ItemSheetV2 } = foundry.applications.sheets;
const { HandlebarsApplicationMixin } = foundry.applications.api;

export default class EspersItemSheet extends HandlebarsApplicationMixin(ItemSheetV2) {
    static DEFAULT_OPTIONS = {
        tag: 'form',
        position: { width: 600 },
        actions: {
            editImage: EspersItemSheet.#onEditImage,
            createEffect: this.createActiveEffect,
            editEffect: this.editActiveEffect,
            deleteEffect: this.deleteActiveEffect,
            toggleEffect: this.toggleActiveEffect
        },
        form: {
            handler: this.updateForm,
            submitOnChange: true,
            closeOnSubmit: false
        }
    };

    get title() {
        return `${game.i18n.localize('TYPES.Item.artifacts')}: ${this.item.name}`;
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
}
