const invalidInputs = [
  {
    oldPosition: -10,
    newPosition: 0
  },
  {
    newPosition: 1
  },
  {
    oldPosition: 1,
  },
];

const columnsOutput = [
  {
    dataValues: { 
      position: 0,
      workspaceId: 1,
      column: {
        dataValues: {
          columnId: 1,
          title: "Column A - WG1"
        }
      }
   },
  },
  {
    dataValues: { 
      position: 1,
      workspaceId: 1,
      column: {
        dataValues: {
          columnId: 1,
          title: "Column B - WG1"
        }
      }
    },
  },
]

const cardsOutput = [
  {
    dataValues: { 
      position: 0,
      columnId: 1,
      card: {
        dataValues: {
          cardId: 1,
          title: "Some title 1",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        }
      }
   },
  },
  {
    dataValues: { 
      position: 1,
      columnId: 1,
      card: {
        dataValues: {
          cardId: 1,
          title: "Some title 2",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        }
      }
    },
  },
]

const invalidDatabaseInput = { 
  id: 1,
  direction: true,
  oldPosition: 0,
  newPosition: 1,
  database: 'invalid',
}

const invalidNewPositionInput = { 
  id: 1,
  direction: true,
  oldPosition: 0,
  newPosition: 10,
  database: 'columns',
}

const invalidEqualPositionInput = { 
  id: 1,
  direction: true,
  oldPosition: 1,
  newPosition: 1,
  database: 'columns',
}

const validInput = { 
  id: 1,
  direction: true,
  oldPosition: 0,
  newPosition: 1,
  database: 'columns',
}

const invalidCardsPosition = {
  id: 1,
  direction: true,
  oldPosition: 0,
  newPosition: 10,
  database: 'cards',
}

const invalidCardsPositionEqual = {
  id: 1,
  direction: true,
  oldPosition: 1,
  newPosition: 1,
  database: 'cards',
}

const validInputCard = { 
  id: 1,
  direction: true,
  oldPosition: 0,
  newPosition: 1,
  database: 'cards',
}

const newCardsPosition = [
  { cardId: 3, columnId: 2, position: 0 },
  { cardId: 4, columnId: 2, position: 1 }
]

const oldCardsPosition = [
  { cardId: 1, columnId: 1, position: 0 },
  { cardId: 2, columnId: 1, position: 0 }
]

const invalidCardIdInput = {
  oldColumnId: 1,
  newColumnId: 2,
  newPosition: 2,
  oldPosition: 0,
  cardId: 999,
}

const invalidOldPositionInput = {
  oldColumnId: 1,
  newColumnId: 2,
  newPosition: 2,
  oldPosition: 999,
  cardId: 1,
}

const invalidNewPositionInputOutside = {
  oldColumnId: 1,
  newColumnId: 2,
  newPosition: 999,
  oldPosition: 0,
  cardId: 1,
}

const validInputOutisde = {
  oldColumnId: 1,
  newColumnId: 2,
  newPosition: 2,
  oldPosition: 0,
  cardId: 1,
}

const createOutput = {
  cardId: 1,
  columnId: 2,
  position: 2,
}

const invalidBody = [
  {
    newColumnId: 2,
    newPosition: 2,
    oldPosition: 0,
  },
  {
    oldColumnId: 1,
    newPosition: 2,
    oldPosition: 0,
  },
  {
    oldColumnId: 1,
    newColumnId: 2,
    oldPosition: 0,
  },
  {
    oldColumnId: 1,
    newColumnId: 2,
    newPosition: 2,
  }
]

const validBody = {
  oldColumnId: 1,
  newColumnId: 2,
  newPosition: 2,
  oldPosition: 0,
}

const invalidOldPositionBody = {
  oldColumnId: 1,
  newColumnId: 2,
  newPosition: 2,
  oldPosition: 999,
}

const invalidNewPositionBody = {
  oldColumnId: 1,
  newColumnId: 2,
  newPosition: 999,
  oldPosition: 0,
}

export {
  invalidInputs,
  invalidDatabaseInput,
  invalidNewPositionInput,
  columnsOutput,
  invalidEqualPositionInput,
  validInput,
  cardsOutput,
  invalidCardsPosition,
  invalidCardsPositionEqual,
  validInputCard,
  newCardsPosition,
  oldCardsPosition,
  invalidCardIdInput,
  invalidOldPositionInput,
  invalidNewPositionInputOutside,
  validInputOutisde,
  createOutput,
  invalidBody,
  validBody,
  invalidOldPositionBody,
  invalidNewPositionBody,
};

