class Card {
  //card is divided by 4 slots
  constructor() {
    this.slots = [null, null, null, null];
  }
}

const deck = []; //Deck
const terrainTypes = ["forest", "river", "floodplain", "farm", "urban", "risk"]; //terrain types
const terrainPercentages = [20, 28, 20, 20, 6, 6]; //for balancing how much of eac terrain type will be distributed
const terrainCounts = []; //count how many terrain in integer based on percentage above
let cardsFilled = 0;

for (let i = 0; i < 48; i++) {
  deck.push(new Card());
}

for (let i = 0; i < terrainPercentages.length; i++) {
  //conta quantos terrenos de cada tipo tera com base na porcentagem
  terrainCounts.push(Math.round((192 * terrainPercentages[i]) / 100)); //48 cards*4slots - finding percentage
}

while (cardsFilled < 48) {
  // will distribute terrain types avoiding repetition
  for (let i = 0; i < deck.length; i++) {
    //deck cards selecting
    if (!deck[i].slots.includes(null)) {
      continue;
    }
    for (let s = 0; s < 4; s++) {
      if (deck[i].slots[s] !== null) {
        continue;
      }
      let terrainIndex = Math.floor(Math.random() * terrainTypes.length);
      let tries = 0;
      while (deck[i].slots.includes(terrainTypes[terrainIndex]) && tries < 6) {
        //tries to fill the slot without repeating terrain for 3 times
        terrainIndex = Math.floor(Math.random() * terrainTypes.length);
        tries++;
      }
      if (tries < 6) {
        deck[i].slots[s] = terrainTypes[terrainIndex];
        terrainCounts[terrainIndex]--;
        cardsFilled++;
      }
      if (terrainCounts[terrainIndex] === 0) {
        terrainTypes.splice(terrainIndex, 1);
        terrainCounts.splice(terrainIndex, 1);
      }
    }
  }
}

const distributeRemainingTerrain = () => {
  //distribute terrain after it became impossible to avoid repetition
  for (let i = 0; i < terrainCounts.length; i++) {
    while (terrainCounts[i] > 0) {
      let cardIndex = Math.floor(Math.random() * 48);
      let slotIndex = Math.floor(Math.random() * 4);
      while (deck[cardIndex].slots[slotIndex] !== null) {
        cardIndex = Math.floor(Math.random() * 48);
        slotIndex = Math.floor(Math.random() * 4);
      }
      deck[cardIndex].slots[slotIndex] = terrainTypes[i];
      terrainCounts[i]--;
    }
  }
};
distributeRemainingTerrain();

// Create the table element in html
const table = document.createElement("table");
table.id = "deck";

// Create the table header
const headerRow = document.createElement("tr");
const cardHeader = document.createElement("th");
cardHeader.textContent = "Card";
headerRow.appendChild(cardHeader);
for (let i = 1; i <= 4; i++) {
  const slotHeader = document.createElement("th");
  slotHeader.textContent = `Slot ${i}`;
  headerRow.appendChild(slotHeader);
}
const header = document.createElement("thead");
header.appendChild(headerRow);
table.appendChild(header);

// Create the table body
const body = document.createElement("tbody");
for (let i = 0; i < deck.length; i++) {
  const cardRow = document.createElement("tr");
  const cardNumber = document.createElement("td");
  cardNumber.textContent = `Card ${i + 1}`;
  cardRow.appendChild(cardNumber);
  for (let s = 0; s < 4; s++) {
    const slot = document.createElement("td");
    slot.textContent = deck[i].slots[s];
    cardRow.appendChild(slot);
  }
  body.appendChild(cardRow);
}
table.appendChild(body);

// Add the table to the page
document.body.appendChild(table);
