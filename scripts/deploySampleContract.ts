import { toNano } from '@ton/core';
import { SampleContract } from '../wrappers/SampleContract';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const sampleContract = provider.open(await SampleContract.fromInit(provider.sender().address!!));

    await sampleContract.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(sampleContract.address);
}
