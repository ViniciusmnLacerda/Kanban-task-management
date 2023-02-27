export default interface IControls {
  isCreatingWorkspace: boolean;
  isCreatingColumn: boolean;
  workspaceId: string;
  isCreatingTask: boolean;
  changedPositionCards: boolean,
  card: {
    isCreating: boolean;
    isEditing: boolean;
    columnId: string;
  };
  column: {
    isEditing: boolean;
    columnId: string;
  }
};
