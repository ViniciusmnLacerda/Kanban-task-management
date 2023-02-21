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
};

