import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DefenderRelayService } from './defender-relay.service';
import { CreateDefenderRelayDto } from './dto/create-defender-relay.dto';
import { UpdateDefenderRelayDto } from './dto/update-defender-relay.dto';

@Controller('defender-relay')
export class DefenderRelayController {
  constructor(private readonly defenderRelayService: DefenderRelayService) {}

  @Post()
  create(@Body() createDefenderRelayDto: CreateDefenderRelayDto) {
    return this.defenderRelayService.create(createDefenderRelayDto);
  }

  @Get()
  findAll() {
    return this.defenderRelayService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.defenderRelayService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDefenderRelayDto: UpdateDefenderRelayDto) {
    return this.defenderRelayService.update(+id, updateDefenderRelayDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.defenderRelayService.remove(+id);
  }
}
