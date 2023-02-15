const getWorkspacesOutput = [
  {
    workspaceId: 1,
    workspace: {
      name: "Work Group 1",
      createdAt: "2023-02-15T08:42:25.000Z",
      lastUpdate: null
    }
  },
  {
    workspaceId: 2,
    workspace: {
      name: "Work Group 2",
      createdAt: "2023-02-15T08:42:30.000Z",
      lastUpdate: null
    }
  },
  {
    workspaceId: 3,
    workspace: {
      name: "Work Group 3",
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
    name: "Work Group 1",
    createdAt: "2023-02-15T08:42:25.000Z",
    lastUpdate: null
  },
  {
    name: "Work Group 2",
    createdAt: "2023-02-15T08:42:30.000Z",
    lastUpdate: null
  },
  {
    name: "Work Group 3",
    createdAt: "2023-02-15T08:42:35.000Z",
    lastUpdate: null
  },
]

const validCreateInput = {
  name: "New workspace",
  emails: ["vinicius@email.com", "zita@email.com", "igor@email.com"]
}

const invalidCreateInput = {
  name: "New workspace",
  emails: ["invalid@email.com", "zita@email.com", "igor@email.com"]
}

const createOutput = [
  {
    accountId: 1,
    workspaceId: 5,
    owner: true,
  },
  {
    accountId: 2,
    workspaceId: 5,
    owner: false,
  },
  {
    accountId: 4,
    workspaceId: 5,
    owner: false,
  }
]

const usersOutput = [
  { id: 1 },
  { id: 2 },
  { id: 4 },
]

export {
  workspaceOutput,
  accountWorkspacesOutput,
  getWorkspacesOutput,
  validCreateInput,
  invalidCreateInput,
  createOutput,
  usersOutput,
}

