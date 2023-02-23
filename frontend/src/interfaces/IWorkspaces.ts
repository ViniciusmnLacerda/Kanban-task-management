export default interface IWorkspace {
  workspaceId: number;
  owner: boolean;
  workspace: {
    title: string;
    createdAt: string;
    lastUpdate: string | null
  }
}
