const SUITS = ['spades', 'hearts', 'diamonds', 'clubs'];
const RANKS = [
  { key: 'ace', value: 11 },
  { key: '2', value: 2 },
  { key: '3', value: 3 },
  { key: '4', value: 4 },
  { key: '5', value: 5 },
  { key: '6', value: 6 },
  { key: '7', value: 7 },
  { key: '8', value: 8 },
  { key: '9', value: 9 },
  { key: '10', value: 10 },
  { key: 'jack', value: 10 },
  { key: 'queen', value: 10 },
  { key: 'king', value: 10 }
];

export function getStandardDeck() {
  const deck = [];

  for (const suit of SUITS) {
    for (const rank of RANKS) {
      deck.push({
        id: `${rank.key}-${suit}`,
        suit,
        rank: rank.key,
        value: rank.value,
        label: `${rank.key} of ${suit}`,
        img: `systems/espers/assets/cards/card-${rank.key}-${suit}.svg`
      });
    }
  }

  return deck;
}

export function shuffle(array) {
  let currentIndex = array.length;

  while (currentIndex != 0) {

    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}