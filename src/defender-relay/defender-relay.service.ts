import { BadRequestException, Injectable } from '@nestjs/common';
import { RelayClient, Relayer, RelayerGetResponse } from 'defender-relay-client'
import { ethers } from 'ethers';

@Injectable()
export class DefenderRelayService {
  private relayer: Relayer;
  private relayerClient: RelayClient;

  constructor() {
    this.relayer = new Relayer({
      apiKey: process.env.RELAYER_API_KEY,
      apiSecret: process.env.RELAYER_SECRET_KEY,
    });
    this.relayerClient = new RelayClient({
      apiKey: process.env.DEFENDER_TEAM_API_KEY,
      apiSecret: process.env.DEFENDER_TEAM_SECRET_KEY,
    });
  }

  relayTransaction(signedTransaction: SignedTransactionObject): string {
    return 'This action adds a new defenderRelay';
  }

  /**
   * Whitelists an address to be able to send transactions to the relayer
   * @param {string} address - The address to whitelist
   * @returns {string[]} - The addresses whitelisted by relayer
   * @throws - BadRequestException if the address is not a valid Ethereum address
   */
  async whitelistAddress(address: string): Promise<string[]> {
    await this.checkValidAddress(address);
    let relayerInformation: RelayerGetResponse = await this.relayer.getRelayer();
    const currentWhitelist: string[] = relayerInformation.policies.whitelistReceivers ? relayerInformation.policies.whitelistReceivers : [];
    const newWhitelist: string[] = Array.from(new Set([...currentWhitelist, address]))
    console.log(currentWhitelist, newWhitelist);
    relayerInformation = await this.relayerClient.update(relayerInformation.relayerId, {
      policies: {
        whitelistReceivers: newWhitelist
      }
    })
    return relayerInformation.policies.whitelistReceivers ?? [];
  }

  /**
   * Check if input address is valid
   * @param address - adress that is inputted from user request
   * @throws {BadRequestException} - Error if the address is not valid
   */
  private checkValidAddress(address: string) {
    if (!(ethers.utils.isAddress(address))) {
      throw new BadRequestException('Invalid address');
    }
  }

  findAll() {
    return `This action returns all defenderRelay`;
  }
}
