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

export { workspaceOutput, accountWorkspacesOutput, getWorkspacesOutput }
