/* eslint-disable sonarjs/no-duplicate-string */
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('users', [
      {
        email: 'vinicius@email.com',
        password: '$2a$10$dun3xUEzvxq.Gz5kJUrw/el7os8EuLVsu/odPALS1y.CNI7HcXAui',
          // password: MyPassword
      },
      {
        email: 'zita@email.com',
        password: '$2a$10$dun3xUEzvxq.Gz5kJUrw/el7os8EuLVsu/odPALS1y.CNI7HcXAui', 
          // password: MyPassword
      },
      {
        email: 'marianne@email.com',
        password: '$2a$10$dun3xUEzvxq.Gz5kJUrw/el7os8EuLVsu/odPALS1y.CNI7HcXAui', 
          // password: MyPassword
      },
      {
        email: 'igor@email.com',
        password: '$2a$10$dun3xUEzvxq.Gz5kJUrw/el7os8EuLVsu/odPALS1y.CNI7HcXAui', 
          // password: MyPassword
      },      
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};