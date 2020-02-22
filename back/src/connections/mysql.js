const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
const sequelize = new Sequelize('cfv', 'espartaco', '123456', {
  host: 'localhost',
  dialect: 'mysql'
});

/*const sequelize = new Sequelize('confecciones', 'confecciones', '12345678', {
  host: 'db4free.net',
  dialect: 'mysql'
});*/

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;