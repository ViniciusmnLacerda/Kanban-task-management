module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('users', [
      {
        email: 'vinicius@email.com',
        password: 'MyPassword'
          // senha: secret_admin
      },
      {
        email: 'maria@email.com',
        password: 'MyPassowrd', 
          // senha: secret_user
      },
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};