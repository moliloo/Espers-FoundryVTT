export const espers = {};

espers.ascii = 'Espers';

espers.weaponRange = {
    close: {
        label: 'Close',
        value: 'close',
    },
    near: {
        label: 'Near',
        value: 'near',
    },
    far: {
        label: 'Far',
        value: 'far',
    }
};

espers.weaponType = {
    daggers: {
        label: 'Daggers',
        effect: 2,
        range: espers.weaponRange.close,
    },
    sword: {
        label: 'Sword',
        effect: 2,
        range: espers.weaponRange.close,
    },
    longSword: {
        label: 'Long Sword',
        effect: 1,
        range: espers.weaponRange.near,
    },
    axe: {
        label: 'Axe',
        effect: 1,
        range: espers.weaponRange.near,
    },
    cane: {
        label: 'Cane',
        effect: 1,
        range: espers.weaponRange.near,
    },
    spear: {
        label: 'Spear',
        effect: 1,
        range: espers.weaponRange.near,
    },
    bow: {
        label: 'Bow',
        effect: -1,
        range: espers.weaponRange.far,
    },
    boomerang: {
        label: 'Boomerang',
        effect: -1,
        range: espers.weaponRange.far,
    }
};

espers.weaponVariant = {
    bronze: {
        label: 'Bronze',
        effect: 0,
    },
    iron: {
        label: 'Iron',
        effect: 1,
    },
    steel: {
        label: 'Steel',
        effect: 2,
    },
    silver: {
        label: 'Silver',
        effect: 3,
    },
    mithril: {
        label: 'Mithril',
        effect: 4,
    },
    scale: {
        label: 'Scale',
        effect: 5,
    },
};

espers.rarity = {
    common: {
        value: 'common',
        label: 'ESPERS.Item.rarity.common'
    },
    uncommon: {
        value: 'uncommon',
        label: 'ESPERS.Item.rarity.uncommon'
    },
    rare: {
        value: 'rare',
        label: 'ESPERS.Item.rarity.rare'
    },
    legend: {
        value: 'legend',
        label: 'ESPERS.Item.rarity.legend'
    },
};

espers.itemType = {
    consumable: {
        potion: {
            value: 'potion',
            label: 'Potion'
        },
        elixir: {
            value: 'elixir',
            label: 'elixir'
        },
        tonic: {
            value: 'tonic',
            label: 'tonic'
        },
        dust: {
            value: 'dust',
            label: 'dust'
        }
    },
    throwable: {
        bomb: {
            value: 'bomb',
            label: 'bomb'
        },
        vials: {
            value: 'vials',
            label: 'vials'
        }
    },
    general: {
        general: {
            value: 'general',
            label: 'general'
        },
        tent: {
            value: 'tent',
            label: 'tent'
        }
    },
    artifacts: {
        gems: {
            value: 'gems',
            label: 'gems'
        },
        artifacts: {
            value: 'artifacts',
            label: 'artifacts'
        }
    }
};

espers.equipmentType = {
    bangle: {
        value: 'bangle',
        label: 'bangle'
    },
    ring: {
        value: 'ring',
        label: 'ring'
    },
    chain: {
        value: 'chain',
        label: 'chain'
    },
    pendant: {
        value: 'pendant',
        label: 'pendant'
    },
    charm: {
        value: 'charm',
        label: 'charm'
    },
    earring: {
        value: 'earring',
        label: 'earring'
    },
    bracers: {
        value: 'bracers',
        label: 'bracers'
    },
    mail: {
        value: 'mail',
        label: 'mail'
    },
    armlet: {
        value: 'armlet',
        label: 'armlet'
    },
    bracelet: {
        value: 'bracelet',
        label: 'bracelet'
    },
    boots: {
        value: 'boots',
        label: 'boots'
    },
    belt: {
        value: 'belt',
        label: 'belt'
    },
    cloak: {
        value: 'cloak',
        label: 'cloak'
    },
    gloves: {
        value: 'gloves',
        label: 'gloves'
    },
    crystal: {
        value: 'crystal',
        label: 'crystal'
    },
    brooch: {
        value: 'brooch',
        label: 'brooch'
    },
    locket: {
        value: 'locket',
        label: 'locket'
    },
    seal: {
        value: 'seal',
        label: 'seal'
    },
    greaterSeal: {
        value: 'greaterSeal',
        label: 'greaterSeal'
    },
    lense: {
        value: 'lense',
        label: 'lense'
    }
};

espers.tags = {
    weapon: [
        'type',
        'range',
        'variant',
        'rarity'
    ],
    equipment: [
        'type',
        'rarity'
    ],
    gems: [
        'rarity',
    ],
    general: [
        'rarity',
    ],
    gems: [
        'type',
        'rarity',
    ]
}

