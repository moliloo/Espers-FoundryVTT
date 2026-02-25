import EspersActorBase from './actor-base.mjs';

const fields = foundry.data.fields;

export default class EspersCharacter extends EspersActorBase {
    static defineSchema() {
        const requiredInteger = { required: true, nullable: false, integer: true };
        const schema = super.defineSchema();

        schema.gild = new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 });

        schema.cards = new fields.SchemaField({
            aether: new fields.ArrayField(new fields.EmbeddedDataField(FateCard)),
            fate: new fields.ArrayField(new fields.EmbeddedDataField(FateCard)),
            hand: new fields.ArrayField(new fields.EmbeddedDataField(FateCard)),
            discard: new fields.ArrayField(new fields.EmbeddedDataField(FateCard)),
        });

        return schema;
    }
}

class FateCard extends foundry.abstract.DataModel {
  static defineSchema() {
        const fields = foundry.data.fields;
        return {
            id: new fields.StringField({ required: true }),
            label: new fields.StringField({ required: true }),
            img: new fields.FilePathField({
                required: true,
                categories: ['IMAGE'],
                base64: false,
            }),
        };
    }
}