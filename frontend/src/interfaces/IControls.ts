export default interface IControls {
  isCreatingWorkspace: boolean;
  isCreatingColumn: boolean;
  workspaceId: string;
  isCreatingTask: boolean;
  newColumnEmpty: boolean;
  card: {
    isCreating: boolean;
    isEditing: boolean;
    columnId: string;
  };
  column: {
    isEditing: boolean;
    columnId: string;
  }
}
