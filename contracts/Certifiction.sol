// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// import "./Users.sol";

// TODO add NatSpec for every parameters like below
/// @title
/// @author Sarem Eskandary
/// @notice
/// @dev
contract Certification {
    ////////////////////   State variables   ////////////////////
    address public owner;
    uint256 public schoolCount;
    uint256 public studentCount;
    ////////////////////   events     ////////////////////
    // event personAdded(User user);
    event studentCreated(
        address indexed sender,
        string indexed name,
        string indexed IPFShash
    );
    event schoolCreated(
        address indexed sender,
        string indexed name,
        string indexed IPFShash
    );
    event certificateCreated(string indexed _courseName);
    event courseCreated(address indexed sender);

    ////////////////////   enums     ////////////////////
    // enum ourseState {passed, inProgress}
    ////////////////////   struct     ////////////////////
    struct School {
        bytes32[] certificateList;
        uint256 certificatePointer;
        string name;
        string IPFShash; // additional info
        address schoolOwner;
    }
    mapping(address => School) public schoolStruct;
    address[] public schoolList;

    struct Student {
        bytes32[] certificateList;
        uint256 certificatePointer;
        string name;
        string IPFShash; // additional info
    }

    mapping(address => Student) public studentStruct;
    address[] public studentList;

    struct Course {
        address[] students;
        uint256 certificatePointer;
        address schoolID;
        string courseName;
        string IPFShash; // additional info
    }

    mapping(bytes32 => Course) public courseStruct;
    bytes32[] public courseList;

    struct Certificate {
        uint256 certificatePointer;
        address studentID;
        address schoolID;
        bytes32 courseID;
        string courseName;
    }

    mapping(bytes32 => Certificate) public certificateStruct;
    bytes32[] public certificateList;

    ////////////////////   modifiers  ////////////////////
    modifier isOwner() {
        require(msg.sender == owner, "Must be the owner to call this function");
        _;
    }
    modifier verifyCaller(address _address) {
        require(msg.sender == _address, "Unrecognized caller");
        _;
    }
    modifier isSchool(address _schoolOwner) {
        require(
            msg.sender == schoolStruct[_schoolOwner].schoolOwner,
            "Must be the school to call this function"
        );
        _;
    }

    /// @dev student should allow that how can see it's name or certificate
    // modifier isPersonAllowed() {
    //     require(personAllowed == true);
    //     _;
    // }

    constructor() {}

    /// @dev school should add student to the school list
    function createStudent(string memory _name, string memory _IPFShash)
        public
        returns (bool success)
    {
        studentList.push(msg.sender);
        studentStruct[msg.sender].certificatePointer = studentList.length - 1;
        studentStruct[msg.sender].name = _name;
        studentStruct[msg.sender].IPFShash = _IPFShash;

        emit studentCreated(msg.sender, _name, _IPFShash);
        return (true);
    }

    function createSchool(string memory _name, string memory _IPFShash)
        public
        returns (bool success)
    {
        schoolList.push(msg.sender);
        schoolStruct[msg.sender].certificatePointer = schoolList.length - 1;
        schoolStruct[msg.sender].name = _name;
        schoolStruct[msg.sender].IPFShash = _IPFShash;
        schoolStruct[msg.sender].schoolOwner = msg.sender;

        emit schoolCreated(msg.sender, _name, _IPFShash);
        return (true);
    }

    function createCourse(string memory _name)
        public
        isSchool(msg.sender)
        returns (bool success)
    {
        
    }

    function createCertificate(
        bytes32 _ID,
        address _student,
        string memory _courseName
    ) public isSchool(msg.sender) returns (bool success) {
        certificateList.push(_ID);
        certificateStruct[_ID].certificatePointer = certificateList.length - 1;
        certificateStruct[_ID].studentID = _student;
        certificateStruct[_ID].schoolID = msg.sender;
        certificateStruct[_ID].courseName = _courseName;

        emit certificateCreated(_courseName);
        return (true);
    }

    function fetchSchool(address _schoolAddress)
        public
        view
        returns (
            uint256 certificatePointer,
            string memory name,
            string memory IPFShash,
            address schoolOwner
        )
    {
        certificatePointer = schoolStruct[_schoolAddress].certificatePointer;
        name = schoolStruct[_schoolAddress].name;
        IPFShash = schoolStruct[_schoolAddress].IPFShash;
        schoolOwner = schoolStruct[_schoolAddress].schoolOwner;
        return (certificatePointer, name, IPFShash, schoolOwner);
    }

    function fetchStudent(address _studentAddress)
        public
        view
        returns (
            uint256 certificatePointer,
            string memory name,
            string memory IPFShash
        )
    {
        certificatePointer = studentStruct[_studentAddress].certificatePointer;
        name = studentStruct[_studentAddress].name;
        IPFShash = studentStruct[_studentAddress].IPFShash;
        return (certificatePointer, name, IPFShash);
    }

    function fetchCertificate(bytes32 _certificate)
        public
        view
        returns (
            uint256 certificatePointer,
            address studentID,
            address schoolID,
            bytes32 courseID,
            string memory courseName
        )
    {
        certificatePointer = certificateStruct[_certificate].certificatePointer;
        studentID = certificateStruct[_certificate].studentID;
        schoolID = certificateStruct[_certificate].schoolID;   
        courseName = certificateStruct[_certificate].courseName;
        return (certificatePointer, studentID, schoolID, courseID, courseName);
    }
}
    // TODO fix this
    // function fetchCourse(bytes32 _course)
    //     public
    //     view
    //     returns (
    //         address students,
    //         uint256 certificatePointer,
    //         address schoolID,
    //         string memory courseName,
    //         string memory IPFShash // additional info
    //     )
    // {
    //     students = courseStruct[_course].students;
    //     certificatePointer = courseStruct[_course].certificatePointer;
    //     schoolID = courseStruct[_course].schoolID;
    //     courseName = courseStruct[_course].courseName;
    //     IPFShash = courseStruct[_course].IPFShash;
    // }