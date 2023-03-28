#!/usr/bin/env deno

// import { useInkathon, useRegisteredContract } from "@scio-labs/use-inkathon";
import { useRegisteredContract } from "@scio-labs/use-inkathon";

const { contract } = useRegisteredContract("greeter");

/*
import { alephzeroTestnet, SubstrateDeployment } from '@scio-labs/use-inkathon'

export const getDeployments = async (): Promise<SubstrateDeployment[]> => {
  return [
    {
      contractId: 'greeter',
      networkId: alephzeroTestnet.network,
      abi: await import(
        `@inkathon/contracts/greeter/deployments/metadata.json`
      ),
      address: '5HPwzKmJ6wgs18BEcLdH5P3mULnfnowvRzBtFcgQcwTLVwFc',
    },
  ]
}
*/

console.log(contract);
