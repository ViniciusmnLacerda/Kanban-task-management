export default interface IWorkspace {
  workspaceId: number;
  owner: boolean;
  workspace: {
    name: string;
    createdAt: string;
    lastUpdate: string | null
  }
}