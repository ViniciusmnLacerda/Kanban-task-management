import { INTEGER, Model, NUMBER, STRING } from 'sequelize';
import db from '.';
import Cards from './Cards';
import Column from './Column';

class CardsColumn extends Model {
  declare cardId: number;

  declare columnId: number;
}

CardsColumn.init({
  cardId: {
    type: INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  columnId: {
    type: STRING,
    primaryKey: true,
    allowNull: false,
  },
  position: {
    type: NUMBER,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
  modelName: 'cards_column',
  tableName: 'cards_column',
});

CardsColumn.belongsTo(Cards, { foreignKey: 'cardId', as: 'card' });
Cards.hasMany(CardsColumn, { foreignKey: 'cardId', as: 'card' });
CardsColumn.belongsTo(Column, { foreignKey: 'columnId', as: 'column' });
Column.hasMany(CardsColumn, { foreignKey: 'columnId', as: 'column' });

export default CardsColumn;