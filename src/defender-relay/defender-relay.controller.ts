import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DefenderRelayService } from './defender-relay.service';

@Controller('defender-relay')
export class DefenderRelayController {
  constructor(private readonly defenderRelayService: DefenderRelayService) {}

  @Post('/relay-transaction:signedTransactionObject')
  async relayTransaction(
    @Param('signedTransactionObject')
    signedTransactionObject: SignedTransactionObject):
    Promise<string> {
    return await this.defenderRelayService.relayTransaction(signedTransactionObject);
  }

  @Post('/white-list-me:address')
    async whitelistAddress(@Param('address') address: string):Promise<string[]> {
    return await this.defenderRelayService.whitelistAddress(address);
  }

  @Get()
  findAll() {
    return this.defenderRelayService.findAll();
  }
}
