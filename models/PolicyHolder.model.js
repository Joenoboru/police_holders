module.exports = (sequelize, DataTypes) => {
  const PolicyHolder = sequelize.define('PolicyHolder', {
    Code: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    PolicyHolderName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    JoinDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    ReferrerPolicyHolderID: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    freezeTableName: true
  });

  return PolicyHolder;
};