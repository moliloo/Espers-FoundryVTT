export function getDieForAttribute(value) {
  const diceMap = { 1: "d4", 2: "d6", 3: "d8", 4: "d10", 5: "d12" };
  return diceMap[value] || "d4";
}
