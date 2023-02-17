/* eslint-disable max-lines-per-function */
/* eslint-disable camelcase */
/* eslint-disable sonarjs/no-duplicate-string */
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('column_workspaces', [
      {
        column_id: 1,
        workspace_id: 1,
      },
      {
        column_id: 2,
        workspace_id: 1,
      },
      {
        column_id: 3,
        workspace_id: 1,
      },
      {
        column_id: 4,
        workspace_id: 2,
      },
      {
        column_id: 5,
        workspace_id: 2,
      },
      {
        column_id: 6,
        workspace_id: 2,
      },
      {
        column_id: 7,
        workspace_id: 3,
      },
      {
        column_id: 8,
        workspace_id: 3,
      },
      {
        column_id: 9,
        workspace_id: 3,
      },
      {
        column_id: 10,
        workspace_id: 4,
      },
      {
        column_id: 11,
        workspace_id: 4,
      },
      {
        column_id: 12,
        workspace_id: 4,
      },
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('column_workspaces', null, {});
  },
};