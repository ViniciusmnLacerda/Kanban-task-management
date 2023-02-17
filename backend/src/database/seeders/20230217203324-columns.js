/* eslint-disable max-lines-per-function */
/* eslint-disable sonarjs/no-duplicate-string */
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('columns', [
      {
        title: 'Column A - WG1',
      },
      {
        title: 'Column B - WG1',
      },
      {
        title: 'Column C - WG1',
      },
      {
        title: 'Column A - WG2',
      },
      {
        title: 'Column B - WG2',
      },
      {
        title: 'Column C - WG2',
      },
      {
        title: 'Column A - WG3',
      },
      {
        title: 'Column B - WG3',
      },
      {
        title: 'Column C - WG3',
      },
      {
        title: 'Column A - WG4',
      },
      {
        title: 'Column B - WG4',
      },
      {
        title: 'Column C - WG4',
      },
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('columns', null, {});
  },
};