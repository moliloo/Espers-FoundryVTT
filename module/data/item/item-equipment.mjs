import EspersItemBase from "./item-base.mjs";

const fields = foundry.data.fields;

export default class EspersEquipment extends EspersItemBase {
  static defineSchema() {
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();

    schema.price2 = new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 })

    return schema;
  }
}