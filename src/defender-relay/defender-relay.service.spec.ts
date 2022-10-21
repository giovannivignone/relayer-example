import { Test, TestingModule } from '@nestjs/testing';
import { DefenderRelayService } from './defender-relay.service';

describe('DefenderRelayService', () => {
  let service: DefenderRelayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefenderRelayService],
    }).compile();

    service = module.get<DefenderRelayService>(DefenderRelayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
