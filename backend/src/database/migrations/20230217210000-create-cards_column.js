/* eslint-disable camelcase */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const columnWorkspacesTable = await queryInterface.createTable('cards_column', {
      card_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      column_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      position: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
    return columnWorkspacesTable;
  },

  down: async (queryInterface, _Sequelize) => queryInterface.dropTable('cards_column'),
};