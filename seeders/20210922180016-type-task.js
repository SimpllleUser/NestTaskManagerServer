'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'TypeTask',
      ['bug', 'todo', 'fix'].map((name) => ({ name })),
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('TypeTask', null, {});
  },
};
