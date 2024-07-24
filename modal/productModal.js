const {connection} = require('../config/db')
const { DataTypes } = require('sequelize');

const Category = require('../modal/categoryModal');
const User = require('../modal/userModal');
const Product = connection.define("Product",{
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      categoryId: {
        type: DataTypes.INTEGER,
        references: {
          model: Category,
          key: 'id'
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id',
            },
        },
    }
})

Product.belongsTo(Category, {foreignKey: "categoryId"})
Product.belongsTo(User, { foreignKey: 'userId' });
module.exports = {Product}