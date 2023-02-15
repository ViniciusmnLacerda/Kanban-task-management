/* eslint-disable max-lines-per-function */
/* eslint-disable camelcase */
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('accounts', [
      {
        user_id: 1,
        name: 'Vinicius',
        last_name: 'Lacerda',
      },
      {
        user_id: 2,
        name: 'Zita',
        last_name: 'Lacerda',
      },
      {
        user_id: 3,
        name: 'Marianne',
        last_name: 'Bragança',
      },
      {
        user_id: 4,
        name: 'Igor',
        last_name: 'Lacerda',
      },
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('accounts', null, {});
  },
};