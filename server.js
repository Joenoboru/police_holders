const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const server = express();
const db = require("./models");
const corsSettings = {
  originL: "http://localhost:3000"
};

const api = require("./routes/index");
server.use(cors(corsSettings));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use("/", api);
const port = process.env.PORT || 3001;

const serverInstance = server.listen(port, () => {
  console.log(`Server running on port : ${port}`);
});

setDatabase();
async function setDatabase() {
  try {
    await db.databaseConf.sync();
    const policyList = await db.PolicyHolder.findAll()

    if (!policyList.length) {
      seedDatabase()
    }
  } catch (error) { }
}

async function seedDatabase() {
  try {
    // 創建 20 筆 PolicyHolder 資料
    const policyHolders = [];
    for (let i = 1; i <= 50; i++) {
      policyHolders.push({
        Code: `PH${i}`,
        PolicyHolderName: `PolicyHolder${i}`,
        JoinDate: new Date(),
        ReferrerPolicyHolderID: i > 1 ? `PH${i - 1}` : null,
      });
    }
    await db.PolicyHolder.bulkCreate(policyHolders);
    // 創建對應的 IntroductionRelationship 資料
    const introductionRelationships = [
      { Code: 'PH1', ParentPolicyHolderCode: null, LeftPolicyHolderCode: 'PH2', RightPolicyHolderCode: 'PH3', IntroductionType: 'Direct' },
      { Code: 'PH2', ParentPolicyHolderCode: 'PH1', LeftPolicyHolderCode: 'PH4', RightPolicyHolderCode: 'PH5', IntroductionType: 'Direct' },
      { Code: 'PH3', ParentPolicyHolderCode: 'PH1', LeftPolicyHolderCode: 'PH6', RightPolicyHolderCode: 'PH7', IntroductionType: 'Direct' },
      { Code: 'PH4', ParentPolicyHolderCode: 'PH2', LeftPolicyHolderCode: 'PH8', RightPolicyHolderCode: 'PH9', IntroductionType: 'Direct' },
      { Code: 'PH5', ParentPolicyHolderCode: 'PH2', LeftPolicyHolderCode: 'PH10', RightPolicyHolderCode: 'PH11', IntroductionType: 'Direct' },
      { Code: 'PH6', ParentPolicyHolderCode: 'PH3', LeftPolicyHolderCode: 'PH12', RightPolicyHolderCode: 'PH13', IntroductionType: 'Indirect' },
      { Code: 'PH7', ParentPolicyHolderCode: 'PH3', LeftPolicyHolderCode: 'PH14', RightPolicyHolderCode: 'PH15', IntroductionType: 'Indirect' },
      { Code: 'PH8', ParentPolicyHolderCode: 'PH4', LeftPolicyHolderCode: 'PH16', RightPolicyHolderCode: 'PH17', IntroductionType: 'Indirect' },
      { Code: 'PH9', ParentPolicyHolderCode: 'PH4', LeftPolicyHolderCode: 'PH18', RightPolicyHolderCode: 'PH19', IntroductionType: 'Indirect' },
      { Code: 'PH10', ParentPolicyHolderCode: 'PH5', LeftPolicyHolderCode: 'PH20', RightPolicyHolderCode: 'PH21', IntroductionType: 'Indirect' },
      { Code: 'PH11', ParentPolicyHolderCode: 'PH5', LeftPolicyHolderCode: 'PH22', RightPolicyHolderCode: 'PH23', IntroductionType: 'Direct' },
      { Code: 'PH12', ParentPolicyHolderCode: 'PH6', LeftPolicyHolderCode: 'PH24', RightPolicyHolderCode: 'PH25', IntroductionType: 'Direct' },
      { Code: 'PH13', ParentPolicyHolderCode: 'PH6', LeftPolicyHolderCode: 'PH26', RightPolicyHolderCode: 'PH27', IntroductionType: 'Indirect' },
      { Code: 'PH14', ParentPolicyHolderCode: 'PH7', LeftPolicyHolderCode: 'PH28', RightPolicyHolderCode: 'PH29', IntroductionType: 'Indirect' },
      { Code: 'PH15', ParentPolicyHolderCode: 'PH7', LeftPolicyHolderCode: 'PH30', RightPolicyHolderCode: 'PH31', IntroductionType: 'Indirect' },
      { Code: 'PH16', ParentPolicyHolderCode: 'PH8', LeftPolicyHolderCode: 'PH32', RightPolicyHolderCode: 'PH33', IntroductionType: 'Indirect' },
      { Code: 'PH17', ParentPolicyHolderCode: 'PH8', LeftPolicyHolderCode: 'PH34', RightPolicyHolderCode: 'PH35', IntroductionType: 'Direct' },
      { Code: 'PH18', ParentPolicyHolderCode: 'PH9', LeftPolicyHolderCode: 'PH36', RightPolicyHolderCode: 'PH37', IntroductionType: 'Direct' },
      { Code: 'PH19', ParentPolicyHolderCode: 'PH9', LeftPolicyHolderCode: 'PH38', RightPolicyHolderCode: 'PH39', IntroductionType: 'Direct' },
      { Code: 'PH20', ParentPolicyHolderCode: 'PH10', LeftPolicyHolderCode: 'PH40', RightPolicyHolderCode: 'PH41', IntroductionType: 'Direct' },
      { Code: 'PH21', ParentPolicyHolderCode: 'PH11', LeftPolicyHolderCode: 'PH42', RightPolicyHolderCode: 'PH43', IntroductionType: 'Indirect' },
      { Code: 'PH22', ParentPolicyHolderCode: 'PH11', LeftPolicyHolderCode: 'PH44', RightPolicyHolderCode: 'PH45', IntroductionType: 'Direct' },
      { Code: 'PH23', ParentPolicyHolderCode: 'PH12', LeftPolicyHolderCode: 'PH46', RightPolicyHolderCode: 'PH47', IntroductionType: 'Indirect' },
    ];

    await db.IntroductionRelationship.bulkCreate(introductionRelationships);
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error.message);
  }
}



module.exports = serverInstance;