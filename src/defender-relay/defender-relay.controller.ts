import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DefenderRelayService } from './defender-relay.service';
import { RelayerTransaction } from 'defender-relay-client';

@Controller('defender-relay')
export class DefenderRelayController {
  constructor(private readonly defenderRelayService: DefenderRelayService) {}

  @Post('/get-ERC20:address')
  async getERC20Token(
    @Param('address')
    address: string) {
    return await this.defenderRelayService.getFreeToken(address);
  }

  @Post('/white-list-user-address:address')
    async whitelistUserAddress(@Param('address') address: string):Promise<string[]> {
    return await this.defenderRelayService.whitelistAddress(address);
  }

  @Post('/add-ERC20-to-whitelist:address')
  async addERC20ToWhitelist(@Param('address') address: string): Promise<string[]> {
    return await this.defenderRelayService.whitelistERC20TokenAddress(address);
  }
}
