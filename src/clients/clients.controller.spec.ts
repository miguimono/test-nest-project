import { Test, TestingModule } from '@nestjs/testing';
import { ClientsService } from './clients.service';
import { HttpException } from '@nestjs/common';
import { ClientsController } from './clients.controller';

describe('ClientsService', () => {
  let controller: ClientsController;
  let service: ClientsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientsController],
      providers: [ClientsService],
    }).compile();

    controller = module.get<ClientsController>(ClientsController);
    service = module.get<ClientsService>(ClientsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
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

    jest.spyOn(service, 'findClient').mockImplementation(() => result);

    expect(controller.getClient('C', '23445322')).toBe(result);
  });
  it('should throw BAD_REQUEST if parameters are missing', () => {
    expect(() => controller.getClient('', '23445322')).toThrow(HttpException);
  });

  it('should throw NOT_FOUND if client is not found', () => {
    jest.spyOn(service, 'findClient').mockImplementation(() => {
      throw new HttpException('Client not found', 404);
    });

    expect(() => controller.getClient('C', '00000000')).toThrow(HttpException);
  });

  it('should throw INTERNAL_SERVER_ERROR for unexpected errors', () => {
    jest.spyOn(service, 'findClient').mockImplementation(() => {
      throw new Error('Unexpected error');
    });

    expect(() => controller.getClient('C', '23445322')).toThrow(HttpException);
  });
});
