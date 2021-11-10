// SPDX-License-Identifier: MIT
pragma solidity >=0.8.9 <0.9.0;
import "./Users.sol";

// TODO add NatSpec for every parameters like below
/// @title
/// @author Sarem Eskandary
/// @notice 
/// @dev
contract Certifiction is Users {
    ////////////////////   State variables   ////////////////////
    string courseName;
    bool personAllowed;

    ////////////////////   mappings   ////////////////////

    ////////////////////   events     ////////////////////
    event created(address sender, bool created );
    ////////////////////   enums     ////////////////////

    ////////////////////   struct     ////////////////////

    ////////////////////   modifiers  ////////////////////
    modifier onlySchool(uint _id, address copmany) {
        require((items[_id].user == User.school, 'you need owners premision'));
        _;
    }

    modifier onlyPersonAllowed() {
        require(personAllowed == true);
        _;
    }

    // constructor() public {
    // }

    ////////////////////   functions   ////////////////////
    function create(string memory _courseName, address user) public onlySchool {
        items[_id].user == User;

    }
    function getCertificate(address copmany) view public returns onlySchool(copmany) (Certifiction name) {
        
    }
}
