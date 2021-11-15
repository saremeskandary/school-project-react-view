const Certification = artifacts.require("./Certification.sol");

contract("Certification", accounts => {
  it("...should store the value 89.", async () => {
    const certificationInstance = await Certification.deployed();

    // await certificationInstance.set(89, { from: accounts[0] });

    // const storedData = await certificationInstance.get.call();

    // assert.equal(storedData, 89, "The value 89 was not stored.");
  });
});