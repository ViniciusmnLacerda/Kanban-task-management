import { INTEGER, Model, STRING } from 'sequelize';
import db from '.';

class Cards extends Model {
  declare id: number;

  declare title: string;

  declare content: string;
}

Cards.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: STRING,
    allowNull: false,
  },
  content: {
    type: STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
  modelName: 'cards',
  tableName: 'cards',
});

export default Cards;