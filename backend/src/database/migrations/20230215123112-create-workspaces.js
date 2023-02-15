/* eslint-disable max-lines-per-function */
/* eslint-disable camelcase */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const workspacesTable = await queryInterface.createTable('workspaces', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      last_update: {
        type: Sequelize.DATE,
        allowNull: true,
      },   
    });
    return workspacesTable;
  },

  down: async (queryInterface, _Sequelize) => queryInterface.dropTable('workspaces'),
};