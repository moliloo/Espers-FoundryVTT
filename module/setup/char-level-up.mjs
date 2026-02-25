const { HandlebarsApplicationMixin, ApplicationV2 } = foundry.applications.api;

export default class EspersCharLevelup extends HandlebarsApplicationMixin(ApplicationV2) {
    constructor(character) {
        super({});

        this.character = character;
    }
}