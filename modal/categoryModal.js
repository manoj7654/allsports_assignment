const { DataTypes } = require('sequelize');
const User = require('../modal/userModal');
const { connection } = require('../config/db');

const Category = connection.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: 'Users',
        key: 'id',
    },
},
}, {
  timestamps: true,
});

User.hasMany(Category, { foreignKey: 'userId' });
Category.belongsTo(User, { as: 'user', foreignKey: 'userId' });

module.exports = Category;