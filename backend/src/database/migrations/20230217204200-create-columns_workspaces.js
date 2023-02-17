/* eslint-disable camelcase */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const columnWorkspacesTable = await queryInterface.createTable('column_workspaces', {
      column_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      workspace_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
    return columnWorkspacesTable;
  },

  down: async (queryInterface, _Sequelize) => queryInterface.dropTable('column_workspaces'),
};