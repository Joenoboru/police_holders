function applyExtraSetup(sequelize) {
  const PolicyHolder = sequelize.models.PolicyHolder;
  const IntroductionRelationship = sequelize.models.IntroductionRelationship;

  // 定義 PolicyHolder 和 IntroductionRelationship 之間的關聯
  PolicyHolder.hasMany(IntroductionRelationship, { foreignKey: 'ParentPolicyHolderCode', as: 'ParentRelationships' });
  PolicyHolder.hasMany(IntroductionRelationship, { foreignKey: 'LeftPolicyHolderCode', as: 'LeftRelationships' });
  PolicyHolder.hasMany(IntroductionRelationship, { foreignKey: 'RightPolicyHolderCode', as: 'RightRelationships' });

  IntroductionRelationship.belongsTo(PolicyHolder, { as: 'ParentPolicyHolder', foreignKey: 'ParentPolicyHolderCode' });
  IntroductionRelationship.belongsTo(PolicyHolder, { as: 'LeftPolicyHolder', foreignKey: 'LeftPolicyHolderCode' });
  IntroductionRelationship.belongsTo(PolicyHolder, { as: 'RightPolicyHolder', foreignKey: 'RightPolicyHolderCode' });
}

module.exports = { applyExtraSetup };