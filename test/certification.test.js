const Certification = artifacts.require("./Certification.sol");
let BN = web3.utils.BN;
let { catchRevert } = require("./exceptionsHelpers.js");
const { items: ItemStruct, isDefined, isPayable, isType, isDefinedAndType } = require("./ast-helper");
const { assert } = require("chai");

contract("Certification", accounts => {
  const [_owner, school, sarem, ali] = accounts;
  const id = "0x6c00000000000000000000000000000000000000000000000000000000000000"
  const emptyAddress = "0x0000000000000000000000000000000000000000";
  const nameSchool = "Sahar School";
  const nameAli = "ali";
  const nameCertificate = "first year";
  const IPFShashSchool = "Sahar Image";
  const IPFShashAli = "Sahar Image";

  let instance;

  beforeEach(async () => {
    instance = await Certification.deployed();
  })

  describe('deploiment', async () => {
    it('deploys successfully', async () => {
      const address = await instance.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })
  })

  StructsTest()

  describe('functions', () => {
    describe('student fuctions', () => {
      it('should add a student with name and IPFShash', async () => {
        await instance.createStudent(  {from: ali});

        const result = await instance.fetchStudent.call(ali)
        
        assert.equal(
          result[1], nameAli,
          "the name of the last added student does not match the expected value"
        )
        assert.equal(
          result[2], IPFShashAli,
          "the IPFShash of the last added student does not match the expected value"
        )
      })
    })

    describe('school', () => {
      it('should add a school with name, IPFShash, certificatePointer', async () => {
        await instance.createSchool(nameSchool, IPFShashSchool, {from: school});

        const result = await instance.fetchSchool.call(school)
        
        assert.equal(
          result[1], nameSchool,
          "the name of the last added school does not match the expected value"
        )
        assert.equal(
          result[2], IPFShashSchool,
          "the IPFShash of the last added school does not match the expected value"
          )
        assert.equal(
          result[3], school,
          "the schoolOwner of the last added school does not match the expected value"
        )
      })
    })

    describe('course functions', () => {
      it('should add a schoolID, courseName, IPFShash', async () => {
        await instance.createCourse(nameCourse, IPFShashCourse, {from: school});

        const result = await instance.fetchCourse.call(school)
        
        assert.equal(
          result[1], nameCourse,
          "the name of the last added school does not match the expected value"
        )
        assert.equal(
          result[2], IPFShashCourse,
          "the IPFShash of the last added school does not match the expected value"
          )
        assert.equal(
          result[3], school,
          "the schoolOwner of the last added school does not match the expected value"
        )
      })
    })
    
    describe('certificate functions', () => {
      it('should add a schoolID, studentID, courseName, id', async () => {
        await instance.createCertificate(id, ali, nameCertificate, {from: school});

        const result = await instance.fetchCertificate.call(id)
      
        assert.equal(
          result[1], ali,
          "the ali of the last added certificate does not match the expected value"
          )
        assert.equal(
          result[2], school,
          "the id of the last added certificate does not match the expected value"
        )
        assert.equal(
          result[4], nameCertificate,
          "the nameCertificate of the last added certificate does not match the expected value"
        )
      })
    })
  })
});

function StructsTest() {
  describe('structs', () => {
    describe('Course Struct', () => {
      let School

      before(async () => {
        School = await ItemStruct(Certification, "School")
        assert(
          School != null,
          "The contract should define an `School Struct`"
        )
      })

      // it('this is a test for certificateList', async () => {
      //   isDefinedAndType(School)("certificateList")("bytes32[]")
      // })

      it('this is a test for certificatePointer', async () => {
        isDefinedAndType(School)("certificatePointer")("uint256")
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

      // it('this is a test for certificateList', async () => {
      //   isDefinedAndType(Student)("certificateList")("bytes32[]")
      // })

      it('this is a test for certificatePointer', async () => {
        isDefinedAndType(Student)("certificatePointer")("uint256")
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

      // it('this is a test for studentList', async () => {
      //   isDefinedAndType(Course)("studentList")("address")
      // })

      it('this is a test for certificatePointer', async () => {
        isDefinedAndType(Course)("certificatePointer")("uint256")
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
        isDefinedAndType(Certificate)("certificatePointer")("uint256")
      })
      
      it('this is a test for studentID', async () => {
        isDefinedAndType(Certificate)("studentID")("address")
      })

      it('this is a test for schoolID', async () => {
        isDefinedAndType(Certificate)("schoolID")("address")
      })

      it('this is a test for id', async () => {
        isDefinedAndType(Certificate)("id")("bytes32")
      })

      it('this is a test for courseName', async () => {
        isDefinedAndType(Certificate)("courseName")("string")
      })
    })
  })
}

  