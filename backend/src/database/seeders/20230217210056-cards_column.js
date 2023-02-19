/* eslint-disable max-lines-per-function */
/* eslint-disable camelcase */
/* eslint-disable sonarjs/no-duplicate-string */
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('cards_column', [
      {
        card_id: 1,
        column_id: 1,
        position: 0,
      },
      {
        card_id: 2,
        column_id: 1,
        position: 1,
      },
      {
        card_id: 3,
        column_id: 2,
        position: 0,
      },
      {
        card_id: 4,
        column_id: 2,
        position: 1,
      },
      {
        card_id: 5,
        column_id: 3,
        position: 0,
      },
      {
        card_id: 6,
        column_id: 3,
        position: 1,
      },
      {
        card_id: 7,
        column_id: 4,
        position: 0,
      },
      {
        card_id: 8,
        column_id: 4,
        position: 1,
      },
      {
        card_id: 9,
        column_id: 5,
        position: 0,
      },
      {
        card_id: 10,
        column_id: 5,
        position: 1,
      },
      {
        card_id: 11,
        column_id: 6,
        position: 0,
      },
      {
        card_id: 12,
        column_id: 6,
        position: 1,
      },
      {
        card_id: 13,
        column_id: 7,
        position: 0,
      },
      {
        card_id: 14,
        column_id: 7,
        position: 1,
      },
      {
        card_id: 15,
        column_id: 8,
        position: 0,
      },
      {
        card_id: 16,
        column_id: 8,
        position: 1,
      },
      {
        card_id: 17,
        column_id: 9,
        position: 0,
      },
      {
        card_id: 18,
        column_id: 9,
        position: 1,
      },
      {
        card_id: 19,
        column_id: 10,
        position: 0,
      },
      {
        card_id: 20,
        column_id: 10,
        position: 1,
      },
      {
        card_id: 21,
        column_id: 11,
        position: 0,
      },
      {
        card_id: 22,
        column_id: 11,
        position: 1,
      },
      {
        card_id: 23,
        column_id: 12,
        position: 0,
      },
      {
        card_id: 24,
        column_id: 12,
        position: 1,
      },
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('cards_column', null, {});
  },
};