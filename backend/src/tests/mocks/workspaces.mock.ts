const getWorkspacesOutput = [
  {
    workspaceId: 1,
    workspace: {
      ttile: "Work Group 1",
      createdAt: "2023-02-15T08:42:25.000Z",
      lastUpdate: null
    }
  },
  {
    workspaceId: 2,
    workspace: {
      ttile: "Work Group 2",
      createdAt: "2023-02-15T08:42:30.000Z",
      lastUpdate: null
    }
  },
  {
    workspaceId: 3,
    workspace: {
      ttile: "Work Group 3",
      createdAt: "2023-02-15T08:42:35.000Z",
      lastUpdate: null
    }
  }
]

const accountWorkspacesOutput = [
  { workspaceId: 1 },
  { workspaceId: 2 },
  { workspaceId: 3 },
]

const workspaceOutput = [
  {
    title: "Work Group 1",
    createdAt: "2023-02-15T08:42:25.000Z",
    lastUpdate: null
  },
  {
    title: "Work Group 2",
    createdAt: "2023-02-15T08:42:30.000Z",
    lastUpdate: null
  },
  {
    title: "Work Group 3",
    createdAt: "2023-02-15T08:42:35.000Z",
    lastUpdate: null
  },
]

const validCreateInput = {
  title: "New workspace",
  emails: ["vinicius@email.com", "zita@email.com", "igor@email.com"]
}

const invalidCreateInput = {
  title: "New workspace",
  emails: ["vinicius@email.com", "invalid@email.com", "igor@email.com"]
}

const wrongOwnerInput = {
  title: "New workspace",
  emails: ["zita@email.com", "vinicius@email.com", "igor@email.com"]
}

const invalidInputs = [
  {
    emails: ["vinicius@email.com", "zita@email.com", "igor@email.com"],
  },
  {
    title: "New workspace",
  },
  {
    title: "New workspace",
    emails: [],
  },
  {
    title: "New workspace",
    emails: [1, 2, true],
  }
]

const createOutput = [
  {
    accountId: 1,
    workspaceId: 5,
    admin: true,
  },
  {
    accountId: 2,
    workspaceId: 5,
    admin: false,
  },
  {
    accountId: 4,
    workspaceId: 5,
    admin: false,
  }
]

const usersOutput = [
  { id: 1 },
  { id: 2 },
  { id: 4 },
]

const accountWorkspaceOutput = [
  { accountId: 1, admin: true },
  { accountId: 2, admin: false },
  { accountId: 3, admin: false },
]

const accounts = [
  {
    accountId: 1,
    name: "Vinicius",
    lastName: "Lacerda",
    image: null,
  },
  {
    accountId: 2,
    name: "Zita",
    lastName: "Lacerda",
    image: null,
  },
  {
    accountId: 3,
    name: "Marianne",
    lastName: "Bragança",
    image: null,
  },
  {
    accountId: 4,
    name: "Igor",
    lastName: "Lacerda",
    image: null,
  }
]

const membersOutput = [
  {
    accountId: 1,
    name: "Vinicius",
    lastName: "Lacerda",
    image: null,
    admin: true
  },
  {
    accountId: 2,
    name: "Zita",
    lastName: "Lacerda",
    image: null,
    admin: false
  },
  {
    accountId: 3,
    name: "Marianne",
    lastName: "Bragança",
    image: null,
    admin: false
  },
  {
    accountId: 4,
    name: "Igor",
    lastName: "Lacerda",
    image: null,
    admin: false
  }
]

const accountWorkspaceOutputFour = [
  { accountId: 2, admin: true },
  { accountId: 3, admin: false },
  { accountId: 4, admin: false },
]

const accountWorkspaceOutputTwo = [
  { accountId: 1, admin: false },
  { accountId: 3, admin: true },
  { accountId: 4, admin: false },
]


const invalidNameInput = 123456;

export {
  workspaceOutput,
  accountWorkspacesOutput,
  getWorkspacesOutput,
  validCreateInput,
  invalidCreateInput,
  createOutput,
  usersOutput,
  wrongOwnerInput,
  invalidInputs,
  accountWorkspaceOutput,
  accounts,
  membersOutput,
  invalidNameInput,
  accountWorkspaceOutputFour,
  accountWorkspaceOutputTwo,
}

