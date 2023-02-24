export default interface IControls {
  isCreatingWorkspace: boolean;
  isCreatingColumn: boolean;
  workspaceId: string;
  isCreatingTask: boolean;
  card: {
    isCreating: boolean;
    columnId: string;
  };
}
