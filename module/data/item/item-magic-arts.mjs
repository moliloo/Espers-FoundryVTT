import EspersItemBase from './item-base.mjs';

const fields = foundry.data.fields;

export default class EspersMagicArts extends EspersItemBase {
    static defineSchema() {
        const requiredInteger = { required: true, nullable: false, integer: true };
        const schema = super.defineSchema();

        schema.abilities = new fields.TypedObjectField(
            new fields.SchemaField({
                name: new fields.StringField({ required: true, blank: true, initial: 'Ability' }),
                description: new fields.HTMLField({ required: true, blank: true, initial: 'Description' }),
                rankedAbilities: new fields.TypedObjectField(
                    new fields.SchemaField({
                        name: new fields.StringField({ required: true, blank: true, initial: 'Ability' }),
                        description: new fields.HTMLField({ required: true, blank: true, initial: 'Description' }),
                    })
                ),
                skilledAbilities: new fields.TypedObjectField(
                    new fields.SchemaField({
                        name: new fields.StringField({ required: true, blank: true, initial: 'Ability' }),
                        description: new fields.HTMLField({ required: true, blank: true, initial: 'Description' }),
                        damage: new fields.StringField({ required: true, blank: true, initial: '' }),
                        level: new fields.NumberField({ required: true, integer: true }),
                    })
                )
            })
        );

        return schema;
    }
}
