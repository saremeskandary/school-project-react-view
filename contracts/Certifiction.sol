// SPDX-License-Identifier: MIT
pragma solidity >=0.8.9 <0.9.0;
// import "./Users.sol";


contract Joint {
    
}

// TODO add NatSpec for every parameters like below
/// @title
/// @author Sarem Eskandary
/// @notice 
/// @dev
contract Certifiction {
    ////////////////////   State variables   ////////////////////
    address public owner;
    
    ////////////////////   events     ////////////////////
    // event personAdded(User user);
    event created(address sender, bool created );

    ////////////////////   enums     ////////////////////

    ////////////////////   struct     ////////////////////
    // چکار کنیم هر مدرسه نتواند مدرسه دیگر را تغییر دهد و
    //  هرکس نتواند مدرسه بسازد ولی هرکس بتواند دانش‌اموز بسازد 
    struct School {
        bytes32[] certificateList;
        uint certificatePointer;
        string name;
        string IPFShash; // additional info
        address schoolOwner;
    }
    mapping (address=>School) schoolStruct;
    address[] public schoolList;

    struct Student {
        bytes32[] certificateList;
        uint certificatePointer;
        string name;
        string IPFShash; // additional info
    }
    mapping (address=>Student) studentStruct;
    address[] public studentList;

    struct Certificate {
        uint certificatePointer;
        address studentID;
        address schoolID;
        string courseName;
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

    modifier isSchool(address _school) {
        require(schoolList[_school].schoolOwner == msg.sender, "Must be the school to call this function");
        _;
    }

    /// @dev student should allow that how can see it's name or certificate
    // modifier isPersonAllowed() {
    //     require(personAllowed == true);
    //     _;
    // }

    // constructor() public {
    // }

    ////////////////////   functions   ////////////////////

    /// @dev school should add person to the school list
    function addPersonToSchool(User user) public onlySchool {
        
    }

    /// @dev school should add person to the school list
    // function addStudentsPassedLesson(type name) public onlySchool {
    //     string lessonName;
    //     uint lessonGrade;
    // }

    // function create(string memory _courseName, address user) public onlySchool {
    //     items[_id].user == User;

    // }
    // function getCertificate(address copmany) view public onlySchool returns (string _copmany)  {
        
    // }
}
