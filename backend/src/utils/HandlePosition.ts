import { IColumn } from '../interfaces';

export default class HandlePosition {
  public shiftLeft = (
    array: IColumn[],
    oldPosition: number,
    newPosition: number,
  ) => {
    const newArray = array.map((element) => {
      if (element.position === oldPosition) {
        const assistant = element;
        assistant.position = newPosition;
        return assistant;
      }

      if (element.position > newPosition && element.position < oldPosition) {
        const assitant = element;
        assitant.position = element.position + 1;
        return assitant;
      }
      return element;
    });

    return newArray;
  };
}

// MUDANÇAS PARA ESQUERDA OU PARA CIMA
// quem ta antes da nova posição mantém sua posição
// quem ta depois da posição antiga mantém sua posição
// quem ta entre a posição nova e a antiga SOM uma unidade na posição e o alterado assume a nova posição

// MUDANÇAS PARA DIRETA OU PARA BAIXO
// quem ta antes da nova posição mantém sua posição
// quem ta depois da posição antiga mantém sua posição
// quem ta entre a posição nova e a antiga SUBTRAI uma unidade na posição e o alterado assume a nova posição