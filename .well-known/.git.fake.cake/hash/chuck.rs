use hex_literal::hex;
use tiger::{Tiger, Digest};

// create a Tiger object
let mut hasher = Tiger::new();

// process input message
hasher.update(b"hello world");

// acquire hash digest in the form of GenericArray,
// which in this case is equivalent to [u8; 24]
let result = hasher.finalize();
assert_eq!(result[..], hex!("4c8fbddae0b6f25832af45e7c62811bb64ec3e43691e9cc3")); // huhu
