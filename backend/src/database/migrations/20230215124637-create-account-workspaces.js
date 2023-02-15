/* eslint-disable camelcase */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const workspacesTable = await queryInterface.createTable('account_workspaces', {
      workspace_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      account_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
    return workspacesTable;
  },

  down: async (queryInterface, _Sequelize) => queryInterface.dropTable('account_workspaces'),
};