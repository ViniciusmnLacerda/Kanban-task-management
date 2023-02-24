export default interface IColumn {
  workspaceId: number;
  position: number;
  column: {
    columnId: number;
    title: string;
  }
}
