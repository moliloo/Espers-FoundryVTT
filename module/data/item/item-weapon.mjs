import EspersItemBase from './item-base.mjs';

const fields = foundry.data.fields;

export default class EspersWeapon extends EspersItemBase {
    static defineSchema() {
        const requiredInteger = { required: true, nullable: false, integer: true };
        const schema = super.defineSchema();

        schema.type = new fields.StringField({ required: true, blank: true });
        schema.range = new fields.StringField({ required: true, blank: true });
        schema.variant = new fields.StringField({ required: true, blank: true });

        schema.variantDamage = new fields.StringField({ ...requiredInteger, initial: 0, min: 0 });
        schema.damage = new fields.StringField({ ...requiredInteger, initial: 0, min: 0 });

        return schema;
    }
}
