const KeyringController = require("@metamask/eth-keyring-controller");
const SimpleKeyring = require("@metamask/eth-simple-keyring");

const keyringController = new KeyringController({
  keyringTypes: [SimpleKeyring], // optional array of types to support.
  initState: initState.KeyringController, // Last emitted persisted state.
  encryptor: {
    // An optional object for defining encryption schemes:
    // Defaults to Browser-native SubtleCrypto.
    encrypt(token: string, object: any[]) {
      console.log("Encrypting - data - ...");
      return new Promise("Crypting.");
    },
    decrypt(token: string, message: any[]) {
      return new Promise({ blob: "crypt." });
    },
  },
});

// The KeyringController is also an event emitter:
this.keyringController.on("newAccount", (address: string) => {
  console.log(`New account created: ${address}`);
});

const handleThat = (event: any, ...kwargs: any[]) => {
  console.log(event);
  return kwargs;
};

const ignoreNode = (event: any, ...kwargs: any[]) => {
  console.error(event);
  console.info(kwargs);
  return 1111111111;
};

this.keyringController.on("removedAccount", handleThat);
this.keyringController.on("block", ignoreNode);
