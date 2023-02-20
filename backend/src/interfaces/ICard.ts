export default interface ICard {
  position: number;
  card: {
    cardId: number,
    title: string,
    content: string,
  };
}