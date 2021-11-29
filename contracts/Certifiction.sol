// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// import "./Users.sol";

// TODO add NatSpec for every parameters like below
/// @title
/// @author Sarem Eskandary
/// @notice
/// @dev
contract Certification {
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

    mapping(address => Student) public studentListtruct;
    address[] public studentList;

    struct Course {
        uint256 coursePointer;
        address studentID;
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

    /// @dev school should add student to the school list
    function createStudent(string memory _name, string memory _IPFShash)
        public
        returns (bool success)
    {
        studentList.push(msg.sender);
        studentListtruct[msg.sender].certificatePointer =
            studentList.length -
            1;
        studentListtruct[msg.sender].name = _name;
        studentListtruct[msg.sender].IPFShash = _IPFShash;

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

    function createCourse(
        bytes32 _ID,
        address _student,
        string memory _courseName,
        string memory _IPFShash
    ) public isSchool(msg.sender) returns (bool success) {
        courseList.push(_ID);
        courseStruct[_ID].coursePointer = courseList.length - 1;
        courseStruct[_ID].studentID = _student;
        courseStruct[_ID].schoolID = msg.sender;
        courseStruct[_ID].courseName = _courseName;
        courseStruct[_ID].IPFShash = _IPFShash;

        emit certificateCreated(_courseName);
        return (true);
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
        certificatePointer = studentListtruct[_studentAddress]
            .certificatePointer;
        name = studentListtruct[_studentAddress].name;
        IPFShash = studentListtruct[_studentAddress].IPFShash;
        return (certificatePointer, name, IPFShash);
    }

    function fetchCourse(bytes32 _course)
        public
        view
        returns (
            uint256 coursePointer,
            address studentID,
            address schoolID,
            string memory courseName,
            string memory IPFShash // additional info
        )
    {
        coursePointer = courseStruct[_course].coursePointer;
        schoolID = courseStruct[_course].schoolID;
        courseName = courseStruct[_course].courseName;
        IPFShash = courseStruct[_course].IPFShash;
        return (coursePointer, studentID, schoolID, courseName, IPFShash);
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
