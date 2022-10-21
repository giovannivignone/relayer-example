import { Test, TestingModule } from '@nestjs/testing';
import { DefenderRelayController } from './defender-relay.controller';
import { DefenderRelayService } from './defender-relay.service';

describe('DefenderRelayController', () => {
  let controller: DefenderRelayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DefenderRelayController],
      providers: [DefenderRelayService],
    }).compile();

    controller = module.get<DefenderRelayController>(DefenderRelayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
