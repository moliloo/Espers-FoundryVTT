import EspersActorBase from "./actor-base.mjs";

const fields = foundry.data.fields;

export default class EspersMonster extends EspersActorBase {

  static defineSchema() {
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();

    return schema;
  }
}