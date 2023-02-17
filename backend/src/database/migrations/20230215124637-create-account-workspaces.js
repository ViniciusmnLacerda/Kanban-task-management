/* eslint-disable camelcase */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const accountWorkspacesTable = await queryInterface.createTable('account_workspaces', {
      workspace_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      account_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      admin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
    });
    return accountWorkspacesTable;
  },

  down: async (queryInterface, _Sequelize) => queryInterface.dropTable('account_workspaces'),
};