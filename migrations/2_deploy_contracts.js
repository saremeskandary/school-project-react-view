const Users = artifacts.require("./Users.sol");
const Certification = artifacts.require("./Certification.sol");

module.exports = function(deployer) {
  deployer.deploy(Certification);
  deployer.deploy(Person);
};
