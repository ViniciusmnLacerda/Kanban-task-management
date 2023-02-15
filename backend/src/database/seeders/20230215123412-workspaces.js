/* eslint-disable max-lines-per-function */
/* eslint-disable camelcase */
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('workspaces', [
      {
        name: 'Work Group 1',
        created_at: new Date('2023-02-15T08:42:25.000Z'),
        last_update: null,
      },
      {
        name: 'Work Group 2',
        created_at: new Date('2023-02-15T08:42:30.000Z'),
        last_update: null,
      },
      {
        name: 'Work Group 3',
        created_at: new Date('2023-02-15T08:42:35.000Z'),
        last_update: null,
      },
      {
        name: 'Work Group 4',
        created_at: new Date('2023-02-15T08:42:40.000Z'),
        last_update: null,
      },
      
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('workspaces', null, {});
  },
};