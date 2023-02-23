export default interface IWorkspace {
  workspaceId: number;
  workspace: {
    title: string;
    createdAt: string;
    lastUpdate: string | null
  }
};
