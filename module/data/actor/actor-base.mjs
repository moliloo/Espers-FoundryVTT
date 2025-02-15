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
            strength: new fields.SchemaField({
                level: new fields.NumberField({ ...requiredInteger, initial: 1, min: 1, max: 5 }),
                dice: new fields.StringField({ initial: 'd4' }),
                bonus: new fields.NumberField({ ...requiredInteger, initial: 0 })
            }),
            intelligence: new fields.SchemaField({
                level: new fields.NumberField({ ...requiredInteger, initial: 1, min: 1, max: 5 }),
                dice: new fields.StringField({ initial: 'd4' }),
                bonus: new fields.NumberField({ ...requiredInteger, initial: 0 })
            }),
            charisma: new fields.SchemaField({
                level: new fields.NumberField({ ...requiredInteger, initial: 1, min: 1, max: 5 }),
                dice: new fields.StringField({ initial: 'd4' }),
                bonus: new fields.NumberField({ ...requiredInteger, initial: 0 })
            }),
            dexterity: new fields.SchemaField({
                level: new fields.NumberField({ ...requiredInteger, initial: 1, min: 1, max: 5 }),
                dice: new fields.StringField({ initial: 'd4' }),
                bonus: new fields.NumberField({ ...requiredInteger, initial: 0 })
            })
        });

        schema.level = new fields.NumberField({ ...requiredInteger, initial: 1, min: 0 });

        (schema.moving = new fields.SchemaField({
            level: new fields.NumberField({ ...requiredInteger, initial: 40, min: 0 }),
            bonus: new fields.NumberField({ ...requiredInteger, initial: 0 })
        })),
            (schema.biography = new fields.HTMLField({ required: true, blank: true, initial: 'Biography' }));
        schema.carryingCapacity = new fields.NumberField({ ...requiredInteger, initial: 0 });

        return schema;
    }
}
