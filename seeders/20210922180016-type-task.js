'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Type_Task',
      ['bug', 'todo', 'fix'].map((name) => ({ name })),
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Type_Task', null, {});
  },
};
