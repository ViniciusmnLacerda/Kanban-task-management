/* eslint-disable max-lines-per-function */
/* eslint-disable camelcase */
/* eslint-disable sonarjs/no-duplicate-string */
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('account_workspaces', [
      {
        workspace_id: 1,
        account_id: 1,
        owner: true,
      },
      {
        workspace_id: 1,
        account_id: 2,
        owner: false,
      },
      {
        workspace_id: 1,
        account_id: 3,
        owner: false,
      },
      {
        workspace_id: 1,
        account_id: 4,
        owner: false,
      },
      {
        workspace_id: 2,
        account_id: 1,
        owner: false,
      },    
      {
        workspace_id: 2,
        account_id: 3,
        owner: true,
      },
      {
        workspace_id: 2,
        account_id: 4,
        owner: false,
      },
      {
        workspace_id: 3,
        account_id: 1,
        owner: false,
      },
      {
        workspace_id: 3,
        account_id: 3,
        owner: false,
      },
      {
        workspace_id: 3,
        account_id: 4,
        owner: true,
      },
      {
        workspace_id: 4,
        account_id: 2,
        owner: true,
      },
      {
        workspace_id: 4,
        account_id: 3,
        owner: false,
      },
      {
        workspace_id: 4,
        account_id: 4,
        owner: false,
      },
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('account_workspaces', null, {});
  },
};