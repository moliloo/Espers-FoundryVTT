import EspersItemBase from './item-base.mjs';

const fields = foundry.data.fields;

export default class EspersConsumable extends EspersItemBase {
    static defineSchema() {
        const requiredInteger = { required: true, nullable: false, integer: true };
        const schema = super.defineSchema();

        schema.type = new fields.StringField({ required: true, blank: true });
        schema.quantity = new fields.NumberField({ ...requiredInteger, initial: 1, min: 1 });

        schema.heal = new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 });
        schema.damage = new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 });

        schema.diceBuff = new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 });
        schema.immunities = new foundry.data.fields.ArrayField(new foundry.data.fields.StringField(), {
            required: false,
            default: []
        });
        schema.resistances = new foundry.data.fields.ObjectField({ required: false, default: {} });

        schema.duration = new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 });

        return schema;
    }
}
