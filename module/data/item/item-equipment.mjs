import EspersItemBase from './item-base.mjs';

const fields = foundry.data.fields;

export default class EspersEquipment extends EspersItemBase {
    static defineSchema() {
        const requiredInteger = { required: true, nullable: false, integer: true };
        const schema = super.defineSchema();

        schema.type = new fields.StringField({ required: true, blank: true });
        schema.quantity = new fields.NumberField({ ...requiredInteger, initial: 1, min: 1 });

        schema.actionType = new fields.StringField({ blank: true });
        schema.actionDamage = new fields.StringField({ blank: true });

        schema.advantage = new fields.BooleanField({ initial: false });
        schema.draw = new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 });
        schema.peekTopCard = new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 });

        return schema;
    }
}
