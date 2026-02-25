const fields = foundry.data.fields;

export default class EspersActorBase extends foundry.abstract.TypeDataModel {
    static defineSchema() {
        const requiredInteger = { required: true, nullable: false, integer: true };
        const schema = {};

        // stats
        schema.stats = new fields.SchemaField({
            health: new fields.SchemaField({
                value: new fields.NumberField({ ...requiredInteger, initial: 40, min: 0 }),
                max: new fields.NumberField({ ...requiredInteger, initial: 40 })
            }),
            defense: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 })
        });

        schema.attributes = new fields.SchemaField({
            strength: new fields.NumberField({ ...requiredInteger, initial: 4, min: 4, max: 12 }),
            intelligence: new fields.NumberField({ ...requiredInteger, initial: 4, min: 4, max: 12 }),
            charisma: new fields.NumberField({ ...requiredInteger, initial: 4, min: 4, max: 12 }),
            dexterity: new fields.NumberField({ ...requiredInteger, initial: 4, min: 4, max: 12 }),
        });

        schema.level = new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 });

        schema.moving = new fields.SchemaField({
            level: new fields.NumberField({ ...requiredInteger, initial: 40, min: 0 }),
            bonus: new fields.NumberField({ ...requiredInteger, initial: 0 })
        }),

        schema.biography = new fields.HTMLField({ required: true, blank: true, initial: 'Biography' });

        schema.notes = new fields.HTMLField({ required: true, blank: true, initial: 'Biography' });

        schema.carrying = new fields.NumberField({ ...requiredInteger, initial: 0 });

        return schema;
    }
}
