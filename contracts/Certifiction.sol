// SPDX-License-Identifier: MIT
pragma solidity >=0.8.9 <0.9.0;
// import "./Users.sol";

// TODO add NatSpec for every parameters like below
/// @title
/// @author Sarem Eskandary
/// @notice 
/// @dev
contract Certification {
    ////////////////////   State variables   ////////////////////
    address public  owner;
    uint public     schoolCount;
    uint public     studentCount;
    ////////////////////   events     ////////////////////
    // event personAdded(User user);
    event studentCreated(address indexed sender, string indexed name, string indexed IPFShash);
    event schoolCreated(address indexed sender, string indexed name, string indexed IPFShash);
    event certificateCreated(string indexed _courseName, address indexed school, address indexed student);
    event courseCreated(address indexed sender);
    
    ////////////////////   enums     ////////////////////
    // enum ourseState {passed, inProgress}
    ////////////////////   struct     ////////////////////
    struct School {
        bytes32[]   certificateList;
        uint        certificatePointer;
        string      name;
        string      IPFShash; // additional info
        address     schoolOwner;
    }
    mapping (address=>School) schoolStruct;
    address[] public schoolList;

    struct Student {
        bytes32[]   certificateList;
        uint        certificatePointer;
        string      name;
        string      IPFShash; // additional info
    }
    mapping (address=>Student) studentStruct;
    address[] public studentList;

    struct Course {
        address[]   student;
        uint        certificatePointer;
        address     schoolID;
        string      courseName;
        string      IPFShash; // additional info
    }
    mapping (bytes32=>Course) courseStruct;
    bytes32[] public courseList;

    struct Certificate {
        uint        certificatePointer;
        address     studentID;
        address     schoolID;
        bytes32     courseID;
        string      courseName;
    }
    mapping (bytes32=>Certificate) certificateStruct;
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
        require(msg.sender == schoolStruct[_schoolOwner].schoolOwner , "Must be the school to call this function");
        _;
    }

    /// @dev student should allow that how can see it's name or certificate
    // modifier isPersonAllowed() {
    //     require(personAllowed == true);
    //     _;
    // }

    constructor() {
    }

    /// @dev school should add student to the school list
    function createStudent(string memory _name, string memory _IPFShash) public returns(bool success) {
        studentList.push(msg.sender);
        studentStruct[msg.sender].certificatePointer = studentList.length - 1;
        studentStruct[msg.sender].name               = _name;
        studentStruct[msg.sender].IPFShash           = _IPFShash;

        emit studentCreated(msg.sender, _name, _IPFShash);
        return (true);
    }
    function createSchool(string memory _name, string memory _IPFShash) public returns (bool success) {
        schoolList.push(msg.sender);
        schoolStruct[msg.sender].certificatePointer = schoolList.length - 1;
        schoolStruct[msg.sender].name               = _name;
        schoolStruct[msg.sender].IPFShash           = _IPFShash;

        emit schoolCreated(msg.sender, _name, _IPFShash);
        return (true);
    }
    function createCourse(string memory _name, address _schoolID) 
    public isSchool(_schoolID) returns (bool success) {
        
    }
    function createCertificate(bytes32 _ID, address _student, address _school, string memory _courseName) 
    public isSchool(_school) returns (bool success) {
        certificateList.push(_ID);
        certificateStruct[_ID].certificatePointer = certificateList.length - 1;
        certificateStruct[_ID].studentID          = _student;
        certificateStruct[_ID].schoolID           = _school;  
        certificateStruct[_ID].courseName         = _courseName;

        emit certificateCreated(_courseName, _school, _student);
        return (true);
    }
    // function fetchStudent(address _studentAddress) view public returns (type name) {
        
   // }
   
}
