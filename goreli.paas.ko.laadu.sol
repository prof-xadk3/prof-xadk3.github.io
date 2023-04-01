// SPDX-License-Identifier: ISC
pragma solidity ^0.8.19;

contract POINT {
    string public constant name = "POINT";
    string public constant addr = "6p1MMYDdwuKui89BYYUFODvpapbVNhj7uZf4PNRTAR4g";
    string public constant symbol = "ERC";
    uint8 public constant decimals = 12;

    mapping(address => uint256) balances;

    event Transfer(address indexed from, address indexed to, uint256 tokens);
    
    uint256 public immutable totalSupply;
    
    constructor(uint256 total) {
        totalSupply = total;
        balances[msg.sender] = total;
    }

    function swap_POINT (string symbol, address addr) public view returns (bool) {
        // require(balances[msg.sender] >= numTokens);
        // balances[msg.sender] = balances[msg.sender] - numTokens;
        // balances[receiver] = balances[receiver] + numTokens;
        // emit Transfer(msg.sender, receiver, numTokens);
      // emit {symbol: addr};
      return true;
    }


    function balanceOf(address tokenOwner) public view returns (uint256) {
        return balances[tokenOwner];
    }
    
    function transfer(address receiver, uint256 numTokens) public returns (bool) {
        require(balances[msg.sender] >= numTokens);
        balances[msg.sender] = balances[msg.sender] - numTokens;
        balances[receiver] = balances[receiver] + numTokens;
        emit Transfer(msg.sender, receiver, numTokens);
        return true;
    }
    
    function transferFrom(address owner, address buyer, uint256 numTokens) public returns (bool) {
        require(balances[owner] >= numTokens);
        balances[owner] = balances[owner] - numTokens;
        balances[buyer] = balances[buyer] + numTokens;
        emit Transfer(owner, buyer, numTokens);
        return true;
    }
}

