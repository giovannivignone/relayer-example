# Defender-Relayer-Example
Nestjs server leveraging relayers to automate ERC20 token issuance.

## Description
This repository contains a best practice example of serverside initiated transactions. 

In this repo, I have built permissionable API routes to access relayers for ERC20 token issuance. More routes can be added to access permissioned relayer private key signatures, gasless transactions, or other relayer derived transactions. 

[Defender Relayers](https://docs.openzeppelin.com/defender/relay) abstract private key storage logic using AWS KMS (key managment systems) that store private keys on HSMs (hardware security modules). HSMs deployed by Amazon Web Services obtained an overall level 2 security (with level 3 in cryptographic module specification, authentication, physical security, and design assurance) according to the National Institute of Standards and Technology ([FIBS PUB 140-2](https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.140-2.pdf)). To view the certification, click [here](https://csrc.nist.gov/projects/cryptographic-module-validation-program/Certificate/3139). Signatures by private keys stored in HSMs are executed solely within the KMS. [These keys cannot be exported by anyone without access](https://docs.openzeppelin.com/defender/relay#security-considerations). Access is issued to members you add to your team on the defender website using AWS Identity Service. 

To run this codebase, follow the steps below...

## Installation

```bash
$ npm install
```

## Environment Setup
Please note that you should use AWS Secrets Manager for APIs and Secrets in production
```
1. Copy the .env.example into a new .env file in root.
2. Create an account on the [Defender Website](https://defender.openzeppelin.com).
3. Create a relayer
4. Place a relayer API key in the RELAYER_API_KEY in .env
5. Place a relayer secret key in the RELAYER_SECRET_KEY in .env
6. Go to defender team API keys
7. Create a Teams API key
8. Place the Teams API key into the DEFENDER_TEAM_API_KEY in .env
9. Place the Teams Secret Key into the DEFENDER_TEAM_SECRET_KEY in .env
10. Set CHAIN_ID to 5 for Goerli in .env
11. Deploy an ERC20 contract to the Goerli chain
12. Add the address of the ERC20 token to to ERC_20_TOKEN_ADDRESS in .env
13. Send the Relayer some ERC20 tokens
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test Queries

```
http://localhost:3000/defender-relay/add-ERC20-to-whitelist{deployed erc20 token address}
http://localhost:3000/defender-relay/get-ERC20{your goerli address}
```

## Stay in touch

- Author - Giovanni Vignone
- Twitter - [@giovignone](https://twitter.com/giovignone)

## License

Nest is [MIT licensed](LICENSE).
