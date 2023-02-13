const emailNotAvailableInput = {
  email: "vinicius@email.com",
  password: "MyPassword",
  name: "Vinicius",
  lastName: "Lacerda",
}

const firstInput = {
  email: "marianne@email.com",
  password: "MyPassword",
  name: "Marianne",
  lastName: "Bragança",
}

const secondInput = {
  accountId: 3,
  name: "Marianne",
  lastName: "Bragança",
}

const firstCreateOutput = { 
  id: 3,
  email: 'marianne@email.com',
  password: '$2a$10$kumNEg/CFM28hAiBfe8daeEH6UDtiT0TZYljHGyBllO.WUZK3HVAe'
}

const secondCreateOutput = { 
  id: 3,
  accountId: 3,
  name: "Marianne",
  lastName: "Bragança",
}

export {
  emailNotAvailableInput,
  firstInput,
  firstCreateOutput,
  secondCreateOutput,
  secondInput,
}

