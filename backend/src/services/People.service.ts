/* eslint-disable max-lines-per-function */
import { Op } from 'sequelize';
import sequelize from '../database/models';
import accountsModel from '../database/models/Accounts';
import userModel from '../database/models/Users';
import { IPeople } from '../interfaces';
import { IServiceReader } from './interfaces/IService';

export default class PeopleService implements IServiceReader<IPeople[], number> {
  public getter = async (accountId: number): Promise<IPeople[]> => {
    const people = await accountsModel.findAll({
      raw: true,
      attributes: [
        'name',
        'lastName',
        ['id', 'accountId'],
        'image',
        [sequelize.literal('user.email'), 'email'],
      ],
      where: {
        id: {
          [Op.not]: accountId,
        },
      },
      include: [
        {
          model: userModel,
          as: 'user',
          attributes: [],
        },
      ],
    });
    return people as unknown as IPeople[];
  };
}