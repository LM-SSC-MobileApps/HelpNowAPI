/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('RequestState', { 
    RequestStateID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    Description: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  });
};
