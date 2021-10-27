// SPDX-License-Identifier: MIT
pragma solidity >=0.8.9 <0.9.0;

contract Users {    
    address public owner;

    uint public skuCount;
    
    enum User {
        school,
        Person
    }

    struct Item {
        address id; 
        string name;
        string additionalInfol; // something like image, passport number or national id in IPFS
        User user;
    }
    Item[] public items;

    function create(User _user, string memory _name, string memory _additionalInfol)
        public
    {
        items.push(
            Item({
                id: msg.sender,
                user: _user,
                name: _name,
                additionalInfol: _additionalInfol                 
            })
        );
    }

    function get(uint256 _index)
        public
        view
        returns (
            address id,
            string memory name,
            string memory additionalInfol
        )
    {
        Item storage item = items[_index];
        return (item.id, item.name, item.additionalInfol);
    }

    function update(
        uint256 _index,
        string memory _name,
        string memory additionalInfol
    ) public {
        Item storage item = items[_index];
        item.name = _name;
        item.name = additionalInfol;
    }
}
