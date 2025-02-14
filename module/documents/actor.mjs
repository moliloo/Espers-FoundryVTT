import { getDieForAttribute } from "../helpers/attributesDice.mjs";

export class EspersActor extends Actor {
    prepareData() {
        super.prepareData();

        const data = this.system;

        for (const [key, attr] of Object.entries(data.attributes)) {
            attr.die = getDieForAttribute(attr.value);
        }
    }

    getAttributeDie(attribute) {
        return this.system.attributes[attribute]?.die || "d4";
    }
}
