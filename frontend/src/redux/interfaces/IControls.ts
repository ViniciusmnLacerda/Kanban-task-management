export default interface IControls {
  isCreatingWorkspace: boolean;
  isCreatingColumn: boolean;
  workspaceId: string;
  isCreatingTask: boolean;
  getCards: boolean;
  popup: {
    open: boolean,
    cardId: string,
    columnId: string,
    xPos: string,
    yPos: string,
  }
  changedPositionCards: boolean,
  card: {
    isCreating: boolean;
    isEditing: boolean;
    columnId: string;
    cardId: string;
  };
  column: {
    isEditing: boolean;
    columnId: string;
  }
}
