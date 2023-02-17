module.exports = {
  up: async (queryInterface, Sequelize) => {
    const columnsTable = await queryInterface.createTable('columns', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
    return columnsTable;
  },

  down: async (queryInterface, _Sequelize) => queryInterface.dropTable('columns'),
};