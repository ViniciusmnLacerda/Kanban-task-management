module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('accounts', [
      {
        account_id: 1,
        name: 'Vinicius',
        last_name: 'Lacerda',
      },
      {
        account_id: 2,
        name: 'Maria',
        last_name: 'Lacerda',
      },
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('accounts', null, {});
  },
};