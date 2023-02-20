export default interface INewPosition {
  id: number;
  direction: boolean;
  oldPosition: number;
  newPosition: number;
  database: string;
}