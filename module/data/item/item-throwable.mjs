import EspersItemBase from './item-base.mjs';

const fields = foundry.data.fields;

export default class EspersThrowable extends EspersItemBase {
    static defineSchema() {
        const requiredInteger = { required: true, nullable: false, integer: true };
        const schema = super.defineSchema();

        schema.type = new fields.StringField({ required: true, blank: true });

        return schema;
    }
}
