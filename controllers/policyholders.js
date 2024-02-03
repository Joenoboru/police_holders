const { PolicyHolder, IntroductionRelationship } = require("../models");


async function getPolicyholderDetails(code) {
  const mainPolicyHolder = await PolicyHolder.findOne({
    where: { Code: code },
    attributes: ['Code', 'PolicyHolderName', 'JoinDate', 'ReferrerPolicyHolderID'],
  });

  if (!mainPolicyHolder) {
    throw new Error('Policy holder not found');
  }

  const leftTree = await IntroductionRelationship.findAll({
    where: { ParentPolicyHolderCode: code },
    include: [{ model: PolicyHolder, as: 'LeftPolicyHolder', attributes: ['Code', 'PolicyHolderName', 'JoinDate', 'ReferrerPolicyHolderID'] }],
  });

  const rightTree = await IntroductionRelationship.findAll({
    where: { ParentPolicyHolderCode: code },
    include: [{ model: PolicyHolder, as: 'RightPolicyHolder', attributes: ['Code', 'PolicyHolderName', 'JoinDate', 'ReferrerPolicyHolderID'] }],
  });

  // 組合結果
  const result = {
    code: mainPolicyHolder.Code,
    name: mainPolicyHolder.PolicyHolderName,
    registration_date: mainPolicyHolder.JoinDate,
    introducer_code: mainPolicyHolder.ReferrerPolicyHolderID,
    l: leftTree.map(item => ({
      code: item.LeftPolicyHolder.Code,
      name: item.LeftPolicyHolder.PolicyHolderName,
      registration_date: item.LeftPolicyHolder.JoinDate,
      introducer_code: item.LeftPolicyHolder.ReferrerPolicyHolderID,
    })),
    r: rightTree.map(item => ({
      code: item.RightPolicyHolder.Code,
      name: item.RightPolicyHolder.PolicyHolderName,
      registration_date: item.RightPolicyHolder.JoinDate,
      introducer_code: item.RightPolicyHolder.ReferrerPolicyHolderID,
    })),
  };

  return result;
}

exports.getPolicyholders = async (req, res) => {
  try {
    const code = req.params.code;
    const response = await getPolicyholderDetails(code)
    res.status(200).json(response);
  } catch (err) {
    res.status(500).send({
      message: err.message
    });
  }
};

exports.getTopPolicyholders = async (req, res) => {
  try {
    const code = req.params.code;
    const policyHolder = await PolicyHolder.findOne({
      where: { Code: code },
      attributes: ['Code', 'PolicyHolderName', 'JoinDate', 'ReferrerPolicyHolderID'],
    });
    if (policyHolder.ReferrerPolicyHolderID) {
      const response = await getPolicyholderDetails(policyHolder.ReferrerPolicyHolderID)
      res.status(200).json(response);
    } else {
      throw new Error('No top policy holder');
    }
  } catch (err) {
    res.status(500).send({
      message: err.message
    });
  }
};