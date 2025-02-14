import { EspersActor } from './documents/actor.mjs'
import { EspersItem } from './documents/item.mjs'

import { EspersCharacterSheet } from './sheets/actor/character-sheet.mjs'
import { EspersMonsterSheet } from './sheets/actor/monster-sheet.mjs'
import { EspersItemSheet } from './sheets/item-sheet.mjs'

import { preloadHandlebarsTemplates } from './helpers/templates.mjs'
import { espers } from './helpers/config.mjs'

import * as models from './data/_module.mjs'

Hooks.once('init', function () {
	console.log(espers.ascii)
	console.log('Espers | Initializing your journey through the space')

	game.espers = {
		EspersActor,
		EspersItem,
		EspersCharacterSheet,
		EspersMonsterSheet,
		rollItemMacro
	}

	CONFIG.ESPERS = espers

	CONFIG.Actor.documentClass = EspersActor
	CONFIG.Item.documentClass = EspersItem
	CONFIG.Item.entityClass = EspersItem

	CONFIG.Actor.dataModels = {
		character: models.EspersCharacter,
		monster: models.EspersMonster
	}
	CONFIG.Item.dataModels = {
    equipment: models.EspersEquipment
	}

	Items.unregisterSheet('core', ItemSheet)
	Items.registerSheet('espers', EspersItemSheet, { makeDefault: true })

	Actors.unregisterSheet('core', ActorSheet)
	Actors.registerSheet('espers', EspersCharacterSheet, { types: ['character'], makeDefault: true })
	Actors.registerSheet('espers', EspersMonsterSheet, { types: ['monster'], makeDefault: true })

	preloadHandlebarsTemplates()
})

Hooks.once('ready', function () {
	Hooks.on('hotbarDrop', (bar, data, slot) => createItemMacro(data, slot))
  console.log(game)
})

Handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
	return arg1 == arg2 ? options.fn(this) : options.inverse(this)
})

Handlebars.registerHelper('ifEach', function (collection, condition, options) {
	if (condition && collection.length > 0) {
		return options.fn({ items: collection })
	} else {
		return options.inverse(this)
	}
})

/**
 * Create a Macro from an Item drop.
 * Get an existing item macro if one exists, otherwise create a new one.
 * @param {string} itemUuid
 */
function rollItemMacro(itemUuid) {
	// Reconstruct the drop data so that we can load the item.
	const dropData = {
		type: 'Item',
		uuid: itemUuid
	}
	// Load the item from the uuid.
	Item.fromDropData(dropData).then((item) => {
		// Determine if the item loaded and if it's an owned item.
		if (!item || !item.parent) {
			const itemName = item?.name ?? itemUuid
			return ui.notifications.warn(`Could not find item ${itemName}. You may need to delete and recreate this macro.`)
		}

		// Trigger the item roll
		item.roll()
	})
}