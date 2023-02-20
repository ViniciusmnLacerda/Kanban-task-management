const cardsOutput = [
  {
    columnId: 1,
    position: 0,
    card: {
      cardId: 1,
      title: "Some title 1",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    }
  },
  {
    columnId: 1,
    position: 1,
    card: {
      cardId: 2,
      title: "Some title 2",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    }
  }
]


const validCreateInput = {
  columnId: 1,
  title: 'New card title',
  content: 'New card content',
}

const invalidInputs = [
  {
    content: 'New card content',
  },
  {
    title: 'New card title',
  }
]

export {
  cardsOutput,
  validCreateInput,
  invalidInputs,
}
