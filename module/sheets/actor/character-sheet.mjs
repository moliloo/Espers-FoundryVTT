import { espers } from '../../helpers/config.mjs'

export class EspersCharacterSheet extends ActorSheet {
  static get defaultOptions() {
		return mergeObject(super.defaultOptions, {
			classes: ['espers', 'sheet', 'actor', 'character'],
			width: 600,
			height: 660,
			// tabs: [{ navSelector: '.tab-nav', contentSelector: '.tab-select', initial: 'description' }]
		})
	}

  get template() {
		return `systems/espers/templates/actors/actor/character-sheet.hbs`
	}

  getData() {
		const context = super.getData()
		const actorData = context.data

		context.system = actorData.system
		context.config = CONFIG.ESPERS
		context.rollData = context.actor.getRollData()

		// context.effects = this.prepareActiveEffectCategories(this.actor.effects)

		// this._prepareItems(context)

		return context
	}
}