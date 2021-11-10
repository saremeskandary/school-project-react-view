const Users = artifacts.require("./Users.sol");
const Certification = artifacts.require("./Certification.sol");

module.exports = function(deployer) {
  deployer.deploy(Users);
  deployer.deploy(Certification);
};
