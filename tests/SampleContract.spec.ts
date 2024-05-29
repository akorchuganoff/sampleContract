import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { SampleContract } from '../wrappers/SampleContract';
import '@ton/test-utils';

describe('SampleContract', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let sampleContract: SandboxContract<SampleContract>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        
        deployer = await blockchain.treasury('deployer');
        sampleContract = blockchain.openContract(await SampleContract.fromInit(deployer.address));

        const deployResult = await sampleContract.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: sampleContract.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and sampleContract are ready to use
    });

        // it.skip('should increase counter', async () => {
        //     const increaseTimes = 3;
        //     for (let i = 0; i < increaseTimes; i++) {
        //         console.log(`increase ${i + 1}/${increaseTimes}`);

        //         const increaser = await blockchain.treasury('increaser' + i);

        //         const counterBefore = await sampleContract.getCounter();

        //         console.log('counter before increasing', counterBefore);

        //         const increaseBy = BigInt(Math.floor(Math.random() * 100));

        //         console.log('increasing by', increaseBy);

        //         const increaseResult = await sampleContract.send(
        //             increaser.getSender(),
        //             {
        //                 value: toNano('0.05'),
        //             },
        //             {
        //                 $$type: 'Add',
        //                 queryId: 0n,
        //                 amount: increaseBy,
        //             }
        //         );

        //         expect(increaseResult.transactions).toHaveTransaction({
        //             from: increaser.address,
        //             to: sampleContract.address,
        //             success: true,
        //         });

        //         const counterAfter = await sampleContract.getCounter();

        //         console.log('counter after increasing', counterAfter);

        //         expect(counterAfter).toBe(counterBefore + increaseBy);
        //     }
        // });

    it('should update wallet', async() => {
        const wallet_before = await sampleContract.getWalletAddress();
        
        await sampleContract.send(
            deployer.getSender(),
            {
                value: toNano('2'),
            },
            'UpdateWalletAddress'
        )

        const wallet_after = await sampleContract.getWalletAddress();

        console.log(wallet_before);
        console.log(wallet_after);
    })
});
