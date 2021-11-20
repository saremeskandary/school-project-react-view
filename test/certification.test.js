const Certification = artifacts.require("./Certification.sol");
let BN = web3.utils.BN;
let { catchRevert } = require("./exceptionsHelpers.js");
const { items: ItemStruct, isDefined, isPayable, isType, isDefinedAndType } = require("./ast-helper");

contract("Certification", accounts => {
  const [_owner, alice, bob] = accounts;
  const emptyAddress = "0x0000000000000000000000000000000000000000";
  
  const price = "1000";
  const excessAmount = "2000";
  const name = "book";

  let instance;

  beforeEach(async () => {
    instance = await Certification.new();
  })

  describe('deploiment', async () => {
    it('deploys successfully', async () => {
      const address = await instance.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    // it('has a name', async () => {
    //   const name = await instance.name()
    //   assert.equal(name, 'Certification')
    // })
  describe('variables', () => {
    it("have an owner", async () => {
      assert.equal(typeof instance.owner, 'function', "the contract has no owner");
    });

    it("have an schoolCount", async () => {
      assert.equal(typeof instance.schoolCount, 'function', "the contract has no schoolCount");
    });

    it("have an studentCount", async () => {
      assert.equal(typeof instance.studentCount, 'function', "the contract has no studentCount");
    });
  })

  describe('structs', () => {
    describe('School Struct', () => {
    let School

    before(async () => {
      School = await ItemStruct(Certification, "School")
      assert(
        School != null,
        "The contract should define an `School Struct`"
      )
    })

    it('this is a test for certificateList', async () => {
      isDefinedAndType(School)("certificateList")("bytes32[]")
    })

    it('this is a test for certificatePointer', async () => {
      isDefinedAndType(School)("certificatePointer")("uint")
    })

    it('this is a test for name', async () => {
      isDefinedAndType(School)("name")("string")
    })

    it('this is a test for IPFShash', async () => {
      isDefinedAndType(School)("IPFShash")("string")
    })
  })

  describe('Student Struct', () => {
    let Student

    before(async () => {
      Student = await ItemStruct(Certification, "Student")
      assert(
        Student != null,
        "The contract should define an `Student Struct`"
      )
    })

    it('this is a test for certificateList', async () => {
      isDefinedAndType(Student)("certificateList")("bytes32[]")
    })

    it('this is a test for certificatePointer', async () => {
      isDefinedAndType(Student)("certificatePointer")("uint")
    })

    it('this is a test for name', async () => {
      isDefinedAndType(Student)("name")("string")
    })

    it('this is a test for IPFShash', async () => {
      isDefinedAndType(Student)("IPFShash")("string")
    })
  })

  describe('Course Struct', () => {
    let Course

    before(async () => {
      Course = await ItemStruct(Certification, "Course")
      assert(
        Course != null,
        "The contract should define an `Course Struct`"
      )
    })

    it('this is a test for student', async () => {
      isDefinedAndType(Course)("student")("address")
    })

    it('this is a test for certificatePointer', async () => {
      isDefinedAndType(Course)("certificatePointer")("uint")
    })

    it('this is a test for schoolID', async () => {
      isDefinedAndType(Course)("schoolID")("address")
    })

    it('this is a test for courseName', async () => {
      isDefinedAndType(Course)("courseName")("string")
    })

    it('this is a test for IPFShash', async () => {
      isDefinedAndType(Course)("IPFShash")("string")
    })
  })

  describe('Certificate Struct', () => {
    let Certificate

    before(async () => {
      Certificate = await ItemStruct(Certification, "Certificate")
      assert(
        Certificate != null,
        "The contract should define an `Certificate Struct`"
      )
    })

    it('this is a test for name', async () => {
      isDefinedAndType(Certificate)("certificatePointer")("uint")
    })
    
    it('this is a test for studentID', async () => {
      isDefinedAndType(Certificate)("studentID")("address")
    })

    it('this is a test for schoolID', async () => {
      isDefinedAndType(Certificate)("schoolID")("address")
    })

    it('this is a test for courseID', async () => {
      isDefinedAndType(Certificate)("courseID")("bytes32")
    })

    it('this is a test for courseName', async () => {
      isDefinedAndType(Certificate)("courseName")("string")
    })
  })
  })
  
  describe('Use cases', () => {
    
  })
  
  })
});