export default interface IWorkspace {
  workspaceId: number;
  workspace: {
    name: string;
    createdAt: string;
    lastUpdate: string | null
  }
};