pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyCollectible is ERC721 {
    constructor() ERC721("Nick's WebLN.BNB_NFT.sol.eth #peace !", "MCO") {
    }
}
