pragma solidity >=0.4.21 <0.6.0;

contract Migrations {
  address public owner;
  uint public last_completed_migration;

  constructor() public {
    owner = msg.sender;
  }

  modifier restricted() {
    if (msg.sender == owner) _;
  }

  function setCompleted(uint is_done) public restricted {
    last_completed_migration = is_done;
  }

  function upgrade(address new_addr) public restricted {
    Migrations upgraded = Migrations(new_addr);
    upgraded.setCompleted(last_completed_migration);
  }
}
