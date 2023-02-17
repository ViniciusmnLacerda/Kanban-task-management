module.exports = {
  up: async (queryInterface, Sequelize) => {
    const cardsTable = await queryInterface.createTable('cards', {
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
      content: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
    return cardsTable;
  },

  down: async (queryInterface, _Sequelize) => queryInterface.dropTable('cards'),
};