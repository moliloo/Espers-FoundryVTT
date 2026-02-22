const { loadTemplates } = foundry.applications.handlebars;

export const preloadHandlebarsTemplates = async function () {
    return loadTemplates([
        'systems/espers/templates/sheets/global/items-section.hbs'
    ]);
};
