import { espers } from '../helpers/config.mjs'

export class EspersItemSheet extends ItemSheet {
  static get defaultOptions() {
		return mergeObject(super.defaultOptions, {
			classes: ['espers', 'sheet', 'item'],
			width: 400,
			height: 400,
			// tabs: [{ navSelector: '.tab-nav', contentSelector: '.tab-select', initial: 'description' }]
		})
	}

  get template() {
		return `systems/espers/templates/items/item-sheet.hbs`
	}

  getData() {
		const context = super.getData()

		// context.effects = this.prepareActiveEffectCategories(this.actor.effects)

		// this._prepareItems(context)

		return context
	}
}