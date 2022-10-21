import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DefenderRelayService } from './defender-relay.service';

@Controller('defender-relay')
export class DefenderRelayController {
  constructor(private readonly defenderRelayService: DefenderRelayService) {}

  @Post('/relay-transaction:signedTransactionObject')
  relayTransaction(@Param('signedTransactionObject') signedTransactionObject: string): string {
    console.log(signedTransactionObject);
    return 'relay-transaction';
  }

  @Get()
  findAll() {
    return this.defenderRelayService.findAll();
  }
}
