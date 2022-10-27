import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { RelayClient, Relayer, RelayerGetResponse, RelayerTransaction } from 'defender-relay-client'
import { ethers } from 'ethers';
import { ERC_20_ABI } from './constants/constants';
import { DefenderRelaySigner, DefenderRelayProvider } from 'defender-relay-client/lib/ethers';
import { PermissionsService } from 'src/permissions/permissions.service';


@Injectable()
export class DefenderRelayService {
  private relayer: Relayer;
  private relayerClient: RelayClient;
  private relaySigner: DefenderRelaySigner;
  private relayProvider: DefenderRelayProvider;

  constructor(
    private readonly permissionsService: PermissionsService,
  ) {
    this.relayer = new Relayer({
      apiKey: process.env.RELAYER_API_KEY,
      apiSecret: process.env.RELAYER_SECRET_KEY,
    });
    this.relayerClient = new RelayClient({
      apiKey: process.env.DEFENDER_TEAM_API_KEY,
      apiSecret: process.env.DEFENDER_TEAM_SECRET_KEY,
    });
    this.relayProvider = new DefenderRelayProvider({
      apiKey: process.env.RELAYER_API_KEY,
      apiSecret: process.env.RELAYER_SECRET_KEY,
    });
    this.relaySigner = new DefenderRelaySigner({
      apiKey: process.env.RELAYER_API_KEY,
      apiSecret: process.env.RELAYER_SECRET_KEY,
    }, this.relayProvider, {speed: "fast"})
  }

  /**
   * Mints a single ERC20 token to the specified address only if they are whitelisted
   * @param {string} address - address to send the ERC20 token to
   * @returns {Promise<RelayerTransaction>} - transaction object executed by the relayer
   * @throws {UnauthorizedException} - Error if the address is not whitelisted
   */
  async getFreeToken(address: string) {
    try {
      return await this.executeERC20TransferPayload(address);
    } catch (e) {
      console.log(e)
      throw new UnauthorizedException("Address not whitelisted");
    }
  }

  /**
   * Whitelists an address to be able to send transactions to the relayer
   * @param {string} address - The address to whitelist
   * @returns {string[]} - The addresses whitelisted by relayer
   * @throws - BadRequestException if the address is not a valid Ethereum address
   */
  async whitelistAddress(address: string): Promise<string[]> {
    await this.checkValidAddress(address);
    await this.permissionsService.isUserWhitelistable(address);
    return await this.modifyRelayerWhitelist(address);
  }

  /**
   * Whitelists an address to be able to send transactions to the relayer
   * @param {string} address - The address to whitelist
   * @returns {string[]} - The addresses whitelisted by relayer
   * @throws - BadRequestException if the address is not a valid Ethereum address
   */
  async whitelistERC20TokenAddress(address: string): Promise<string[]> {
    await this.checkValidAddress(address);
    await this.permissionsService.isUserAdmin(address);
    return await this.modifyRelayerWhitelist(address);
  }

  /**
   * Executes an ERC20 transfer data through the relayer provider
   * @param {string} address - Address to send the ERC20 token to
   * @returns {string} - Data payload field
   * @private
   */
  private async executeERC20TransferPayload(address: string) {
    await this.permissionsService.checkPermissionsToTransferERC20(address);
    const contract = new ethers.Contract(process.env.ERC_20_TOKEN_ADDRESS, ERC_20_ABI, this.relaySigner);
    const payload = await contract.transfer(address, 1e18.toString());
    return payload.wait();
  }

  /**
   * Check if input address is valid
   * @param address - adress that is inputted from user request
   * @throws {BadRequestException} - Error if the address is not valid
   * @private
   */
  private checkValidAddress(address: string) {
    if (!(ethers.utils.isAddress(address))) {
      throw new BadRequestException('Invalid address');
    }
  }

  /**
   * Modifies the relayer's whitelist to include the specified address
   * @param {string} address - Address to whitelist
   * @returns {Promise<string[]>} - The addresses whitelisted by relayer
   * @private
   */
  private async modifyRelayerWhitelist(address: string): Promise<string[]> {
    let relayerInformation: RelayerGetResponse = await this.relayer.getRelayer();
    const currentWhitelist: string[] = relayerInformation.policies.whitelistReceivers ? relayerInformation.policies.whitelistReceivers : [];
    const newWhitelist: string[] = Array.from(new Set([...currentWhitelist, address]))
    relayerInformation = await this.relayerClient.update(relayerInformation.relayerId, {
      policies: {
        whitelistReceivers: newWhitelist
      }
    })
    return relayerInformation.policies.whitelistReceivers ?? [];
  }
}
