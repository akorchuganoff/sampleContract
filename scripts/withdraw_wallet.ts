import { Address, toNano } from '@ton/core';
import { SampleContract } from '../wrappers/SampleContract';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const sampleContract = provider.open(await SampleContract.fromInit(provider.sender().address!!));

    await sampleContract.send(
        provider.sender(),
        {
            value: toNano('0.1'),
        },
        {
            $$type: 'Transfer',
            destination: Address.parse("EQA9TqzSeDMxDV2IO7VT9J7mxxIWJs3NyzBi9uP9t0P61h-n"),
            amount: toNano("500"),
        }
    );

}
