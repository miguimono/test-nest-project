import { Test, TestingModule } from '@nestjs/testing';
import { ClientsService } from './clients.service';
import { HttpException } from '@nestjs/common';

describe('ClientsService', () => {
  let service: ClientsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientsService],
    }).compile();

    service = module.get<ClientsService>(ClientsService);
  });

  it('should return client data for valid document', () => {
    const client = service.findClient('C', '23445322');
    expect(client).toEqual({
      firstName: 'Juan',
      secondName: 'Carlos',
      firstSurname: 'Pérez',
      secondSurname: 'Gómez',
      phone: '555-1234',
      address: 'Calle Falsa 123',
      city: 'Bogotá',
    });
  });

  it('should throw BAD_REQUEST for invalid document type', () => {
    expect(() => service.findClient('X', '23445322')).toThrow(HttpException);
  });

  it('should throw NOT_FOUND for non-existent client', () => {
    expect(() => service.findClient('C', '00000000')).toThrow(HttpException);
  });
});
