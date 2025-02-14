const fields = foundry.data.fields;

export default class EspersItemBase extends foundry.abstract.TypeDataModel {

  static defineSchema() {
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = {
			description: new fields.HTMLField({ required: true, blank: true, initial: 'Description' }),
			eqquiped: new fields.BooleanField({initial: false}),
      gild: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 })
		}

    return schema;
  }
}