export default interface ICard {
  columnId: number;
  position: number;
  card: {
    cardId: number,
    title: string,
    content: string,
  };
}
