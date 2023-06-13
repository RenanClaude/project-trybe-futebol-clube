import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';

class TeamsModel extends Model<InferAttributes<TeamsModel>,
InferCreationAttributes<TeamsModel>> {

  declare id: CreationOptional<number>;
  declare team_name: string;
}

TeamsModel.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  team_name: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'books',
  timestamps: false,
});

export default TeamsModel;