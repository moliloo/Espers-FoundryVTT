import { getDieForAttribute } from '../helpers/attributesDice.mjs';

export class EspersActor extends Actor {
    prepareData() {
        super.prepareData();

        const data = this.system;

        for (const [key, attr] of Object.entries(data.attributes)) {
            attr.dice = getDieForAttribute(attr.level);
        }

        data.carryingCapacity = (data.attributes.strength?.level || 0) + 2;
    }
}
