const fields = foundry.data.fields

export default class EspersActorBase extends foundry.abstract.TypeDataModel {
	static defineSchema() {
		const requiredInteger = { required: true, nullable: false, integer: true }
		const schema = {}

		// stats
		schema.stats = new fields.SchemaField({
			health: new fields.SchemaField({
				value: new fields.NumberField({ ...requiredInteger, initial: 40, min: 0 }),
				max: new fields.NumberField({ ...requiredInteger, initial: 40 })
			}),
			defense: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
      level: new fields.NumberField({ ...requiredInteger, initial: 1, min: 0 }),
      moving: new fields.SchemaField({
				value: new fields.NumberField({ ...requiredInteger, initial: 40, min: 0 }),
				bonus: new fields.NumberField({ ...requiredInteger, initial: 0 }) // Modificador extra
			}),
		})

		schema.attributes = new fields.SchemaField({
      strength: new fields.SchemaField({
        value: new fields.NumberField({ ...requiredInteger, initial: 1, min: 1, max: 5 }), // De 1 a 5
        bonus: new fields.NumberField({ ...requiredInteger, initial: 0 }) // Modificador extra
      }),
      intelligence: new fields.SchemaField({
        value: new fields.NumberField({ ...requiredInteger, initial: 1, min: 1, max: 5 }),
        bonus: new fields.NumberField({ ...requiredInteger, initial: 0 })
      }),
      charisma: new fields.SchemaField({
        value: new fields.NumberField({ ...requiredInteger, initial: 1, min: 1, max: 5 }),
        bonus: new fields.NumberField({ ...requiredInteger, initial: 0 })
      }),
      dexterity: new fields.SchemaField({
        value: new fields.NumberField({ ...requiredInteger, initial: 1, min: 1, max: 5 }),
        bonus: new fields.NumberField({ ...requiredInteger, initial: 0 })
      })
    });    

		schema.biography = new fields.HTMLField({ required: true, blank: true, initial: 'Biography' })

		return schema
	}
}