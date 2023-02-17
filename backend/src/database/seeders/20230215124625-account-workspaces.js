/* eslint-disable max-lines-per-function */
/* eslint-disable camelcase */
/* eslint-disable sonarjs/no-duplicate-string */
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('account_workspaces', [
      {
        workspace_id: 1,
        account_id: 1,
        admin: true,
      },
      {
        workspace_id: 1,
        account_id: 2,
        admin: false,
      },
      {
        workspace_id: 1,
        account_id: 3,
        admin: false,
      },
      {
        workspace_id: 2,
        account_id: 1,
        admin: false,
      },    
      {
        workspace_id: 2,
        account_id: 3,
        admin: true,
      },
      {
        workspace_id: 2,
        account_id: 4,
        admin: false,
      },
      {
        workspace_id: 3,
        account_id: 1,
        admin: false,
      },
      {
        workspace_id: 3,
        account_id: 3,
        admin: false,
      },
      {
        workspace_id: 3,
        account_id: 4,
        admin: true,
      },
      {
        workspace_id: 4,
        account_id: 2,
        admin: true,
      },
      {
        workspace_id: 4,
        account_id: 3,
        admin: false,
      },
      {
        workspace_id: 4,
        account_id: 4,
        admin: false,
      },
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('account_workspaces', null, {});
  },
};