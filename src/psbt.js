import * as btc from '@scure/btc-signer';
import { hex, base64 } from '@scure/base';

export const psbt = () => {
    let tx = new btc.Transaction();
    const bitcoinTestnet = {
        bech32: 'tb',
        pubKeyHash: 0x6f,
        scriptHash: 0xc4,
        wif: 0xef,
    }

    // You can use any public Bitcoin API to retrieve unspent outputs
    const output = {
        "tx_hash": "038c4d71bbaa272bab4044d09ac8031915656be07a6c692ee4a41b3b2d4b433b",
        "tx_output_n": 0,
        "value": 600,
    }

    const publicKey = hex.decode("03c5f735efc46b8baf86607710f1165b0044d7aa72a8ea878b9e8b87d6ce18a9c1")
    const p2wpkh = btc.p2wpkh(publicKey, bitcoinTestnet);
    const p2sh = btc.p2sh(p2wpkh, bitcoinTestnet);

    tx.addInput({
    txid: output.tx_hash,
    index: output.tx_output_n,
    witnessUtxo: {
        script: p2sh.script,
        amount: BigInt(output.value),
    },
    redeemScript: p2sh.redeemScript,
    })

    // You can add more inputs here as necessary

    // Add outputs
    const recipient = "2N1MSsnRrEuHshmuNfPAhacGvy5pQe4PCko"
    const changeAddress = "2NEmyev3ZPi3JVtFRZGy6CyAa6jQ1bQbjKq"

    tx.addOutputAddress(recipient, BigInt(100), bitcoinTestnet)
    tx.addOutputAddress(changeAddress, BigInt(100), bitcoinTestnet)

    // Generate the base64 encoded PSBT that can be 
    // passed to a compatible wallet for signing
    const psbt = tx.toPSBT(0)
    const psbtB64 = base64.encode(psbt)
    return psbtB64

    // const internalPubKey =
    // hex.decode("1882c9e57863079524ed3f0bce6bd4bd969f44060026a58635d89687087060af")
    // const p2tr = btc.p2tr(internalPubKey, undefined, bitcoinTestnet)
    // btc.p2sh();

    // tx.addInput({
    // txid: output.tx_hash,
    // index: output.tx_output_n,
    // witnessUtxo: {
    //     script: p2tr.script,
    //     amount: BigInt(output.value),
    // },
    // tapInternalKey: internalPubKey,
    // sighashType: btc.SignatureHash.SINGLE|btc.SignatureHash.ANYONECANPAY
    // })

    // // You can add more inputs here as necessary

    // // Add outputs
    // const recipient = "tb1qywfq4hqtk5xhyl49azc3nlxyq4503t9dcn65xr"
    // const changeAddress = "2NEmyev3ZPi3JVtFRZGy6CyAa6jQ1bQbjKq"

    // tx.addOutputAddress(recipient, BigInt(400), bitcoinTestnet)
    // tx.addOutputAddress(changeAddress, BigInt(100), bitcoinTestnet)

    // // Generate the base64 encoded PSBT that can be 
    // // passed to a compatible wallet for signing
    // const psbt = tx.toPSBT(0)
    // const psbtB64 = base64.encode(psbt)
    // return psbtB64
};