/**
 *  sign-verify.js
 *
 *  David Janes
 *  IOTDB
 *  2016-05-25
 *
 *  Demonstrate Node's Crypto Sign / Verify functions
 */

const crypto = require('crypto')
const fs = require('fs')

const private_key = fs.readFileSync('private.pem', 'utf-8')
const public_key = fs.readFileSync('public.pem', 'utf-8')
const message = fs.readFileSync('message.txt', 'utf-8')

const signer = crypto.createSign('sha256');
signer.update(message);
signer.end();

const signature = signer.sign(private_key)
const signature_hex = signature.toString('hex')

const verifier = crypto.createVerify('sha256');
verifier.update(message);
verifier.end();

const verified = verifier.verify(public_key, signature);

console.log(JSON.stringify({
    message: message,
    signature: signature_hex,
    verified: verified,
}, null, 2));

