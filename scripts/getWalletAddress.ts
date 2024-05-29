import { toNano } from '@ton/core';
import { SampleContract } from '../wrappers/SampleContract';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const sampleContract = provider.open(await SampleContract.fromInit(provider.sender().address!!));

    const wallet = await sampleContract.getWalletAddress();
    console.log(wallet);
}
