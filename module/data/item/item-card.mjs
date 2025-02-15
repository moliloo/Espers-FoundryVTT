import EspersItemBase from './item-base.mjs';

const fields = foundry.data.fields;

export default class EspersCard extends EspersItemBase {
    static defineSchema() {
        const requiredInteger = { required: true, nullable: false, integer: true };
        const schema = super.defineSchema();

        schema.type = new fields.StringField({
            required: true,
            choices: ['number', 'face', 'ace'],
            blank: true
        });

        schema.suit = new fields.StringField({
            required: true,
            choices: ['hearts', 'diamonds', 'clubs', 'spades'],
            blank: true
        });

        schema.cardNumber = new fields.SchemaField({
            value: new fields.NumberField({ ...requiredInteger, initial: 1, min: 1 }),
            bonus: new fields.NumberField({ initial: 0 })
        });

        schema.odd = new fields.BooleanField({ initial: false });
        schema.even = new fields.BooleanField({ initial: false });

        schema.location = new fields.StringField({ required: true, initial: 'aether' });

        return schema;
    }
}
