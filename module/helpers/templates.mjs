const { loadTemplates } = foundry.applications.handlebars;

export const preloadHandlebarsTemplates = async function () {
    return loadTemplates([]);
};
