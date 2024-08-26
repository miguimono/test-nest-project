import {
  Controller,
  Get,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ClientsService } from './clients.service';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get()
  getClient(
    @Query('documentType') documentType: string,
    @Query('documentNumber') documentNumber: string,
  ) {
    if (!documentType || !documentNumber) {
      throw new HttpException(
        'Missing required parameters',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      return this.clientsService.findClient(documentType, documentNumber);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.getStatus ? error.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
