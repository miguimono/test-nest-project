import { Test, TestingModule } from '@nestjs/testing';
import { ClientsService } from './clients.service';

describe('ClientsService', () => {
  let service: ClientsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientsService],
    }).compile();

    service = module.get<ClientsService>(ClientsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should return client data for valid query parameters', () => {
    const result = {
      firstName: 'Juan',
      secondName: 'Carlos',
      firstSurname: 'Pérez',
      secondSurname: 'Gómez',
      phone: '555-1234',
      address: 'Calle Falsa 123',
      city: 'Bogotá',
    };

    expect(service.findClient('C', '23445322')).toEqual(result);
  });
});
