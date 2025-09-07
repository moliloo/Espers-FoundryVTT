const fields = foundry.data.fields;

export default class EspersItemBase extends foundry.abstract.TypeDataModel {
    static defineSchema() {
        const requiredInteger = { required: true, nullable: false, integer: true };
        const schema = {
            eqquiped: new fields.BooleanField({ initial: false }),
            rarity: new fields.StringField({ required: true, blank: true, initial: 'common' }),
            price: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
            size: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
            quantity: new fields.NumberField({ ...requiredInteger, initial: 1, min: 1 }),
            description: new fields.HTMLField({ required: true, blank: true, initial: 'Description' })
        };
        return schema;
    }
}
