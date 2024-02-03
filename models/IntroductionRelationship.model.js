module.exports = (sequelize, DataTypes) => {
  const IntroductionRelationship = sequelize.define('IntroductionRelationship', {
    Code: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    ParentPolicyHolderCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    LeftPolicyHolderCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    RightPolicyHolderCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    IntroductionType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    freezeTableName: true,
  });

  return IntroductionRelationship;
};