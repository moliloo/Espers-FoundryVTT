/**
 * Retrieves a Foundry document associated with the nearest ancestor element
 * that has a `data-item-uuid` attribute.
 * @param {HTMLElement} element - The DOM element to start the search from.
 * @returns {Promise<foundry.abstract.Document|null>} The resolved document, or null if not found or invalid.
 */
export async function getDocFromElement(element) {
    const target = element.closest('[data-item-uuid]');
    return (await foundry.utils.fromUuid(target.dataset.itemUuid)) ?? null;
}