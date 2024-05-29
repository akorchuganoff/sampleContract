import "@stdlib/ownable";
import "@stdlib/deploy";
contract SampleContract with OwnableTransferable, Deployable {
    minter: Address;
    wallet: Address;
    owner: Address;

    init(owner: Address) {
        self.minter = address("EQDYYmT0A54xv9VImHCnY9CTssuKJPLHopl80ewjeL_x9Dn2");
        self.wallet = address("EQA9TqzSeDMxDV2IO7VT9J7mxxIWJs3NyzBi9uP9t0P61h-n");
        self.owner = owner;

    }

    receive ("UpdateWalletAddress") {
        send(SendParameters{
            to: self.minter,
            value: 0,
            mode: SendRemainingValue,
            bounce: true,
            body: ProvideWalletAddress{
                query_id: 0,
                owner_address: myAddress(),
                include_address: true
            }.toCell()
        });
    }

    receive (message: TakeWalletAddress){
        self.wallet = message.wallet_address;
    }

    receive (message: Transfer) {
        send(SendParameters{
            to: self.wallet,
            value: 0,
            mode: SendRemainingValue,
            bounce: true,
            body: TokenTransfer{
                queryId: 0,
                amount: message.amount,
                destination: message.destination,
                response_destination: sender(),
                custom_payload: beginCell().endCell(),
                forward_ton_amount: 0,
                forward_payload: emptySlice()
            }.toCell()
        });
    }

    get fun wallet_address(): Address {
        return self.wallet;
    }

}

message(0xf8a7ea5) TokenTransfer {
    queryId: Int as uint64;
    amount: Int as coins;
    destination: Address;
    response_destination: Address;
    custom_payload: Cell?;
    forward_ton_amount: Int as coins;
    forward_payload: Slice as remaining; // Comment Text message when Transfer the jetton
}

message Transfer {
    destination: Address;
    amount: Int as coins;
}

message UpdateWalletAddress {
    wallet: Address;
}
message(0x2c76b973) ProvideWalletAddress {
    query_id: Int as uint64;
    owner_address: Address;
    include_address: Bool;
}
message(0xd1735400) TakeWalletAddress {
    query_id: Int as uint64;
    wallet_address: Address;
    owner_address: Cell?;
}