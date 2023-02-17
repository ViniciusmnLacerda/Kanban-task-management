import { INTEGER, Model, STRING } from 'sequelize';
import db from '.';

class Columns extends Model {
  declare id: number;

  declare title: string;
}

Columns.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
  modelName: 'columns',
  tableName: 'columns',
});

export default Columns;