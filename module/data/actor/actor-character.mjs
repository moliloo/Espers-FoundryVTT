import EspersActorBase from './actor-base.mjs';

const fields = foundry.data.fields;

export default class EspersCharacter extends EspersActorBase {
    static defineSchema() {
        const requiredInteger = { required: true, nullable: false, integer: true };
        const schema = super.defineSchema();

        schema.gild = new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 });

        schema.aether = new fields.SchemaField({
            fate: new fields.SchemaField({
                value: new fields.NumberField({ ...requiredInteger, initial: 40, min: 0 }),
                max: new fields.NumberField({ ...requiredInteger, initial: 40 })
            }),
            pile: new fields.SchemaField({
                value: new fields.NumberField({ ...requiredInteger, initial: 40, min: 0 }),
                max: new fields.NumberField({ ...requiredInteger, initial: 40 })
            }),
            defense: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 })
        });

        return schema;
    }
}
