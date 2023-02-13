module.exports = {
  up: async (queryInterface, Sequelize) => {
    const usersTable = await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    });
    return usersTable;
  },

  down: async (queryInterface, _Sequelize) => queryInterface.dropTable('users'),
};