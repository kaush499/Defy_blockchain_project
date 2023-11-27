pragma solidity ^0.5.0;

contract DaiToken {
    string  public name = "Mock DAI Token";
    string  public symbol = "mDAI";
    uint256 public totalSupply = 1000000000000000000000000; // 1 million tokens
    uint8   public decimals = 18;

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    constructor() public {
        balanceOf[msg.sender] = totalSupply;
    }

    function transfer(address _receiver, uint256 _amount) public returns (bool success) {
        require(balanceOf[msg.sender] >= _amount);
        balanceOf[msg.sender] -= _amount;
        balanceOf[_receiver] += _amount;
        emit Transfer(msg.sender, _receiver, _amount);
        return true;
    }

    function approve(address _spender, uint256 _amount) public returns (bool success) {
        allowance[msg.sender][_spender] = _amount;
        emit Approval(msg.sender, _spender, _amount);
        return true;
    }

    function transferFrom(address _sender, address _receiver, uint256 _amount) public returns (bool success) {
        require(_amount <= balanceOf[_sender]);
        require(_amount <= allowance[_sender][msg.sender]);
        balanceOf[_sender] -= _amount;
        balanceOf[_receiver] += _amount;
        allowance[_sender][msg.sender] -= _amount;
        emit Transfer(_sender, _receiver, _amount);
        return true;
    }
}
