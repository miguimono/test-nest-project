import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class ClientsService {
  private readonly clientData = {
    type: 'C',
    documentNumber: '23445322',
    firstName: 'Juan',
    secondName: 'Carlos',
    firstSurname: 'Pérez',
    secondSurname: 'Gómez',
    phone: '555-1234',
    address: 'Calle Falsa 123',
    city: 'Bogotá',
  };

  findClient(documentType: string, documentNumber: string) {
    try {
      if (!documentType || !documentNumber) {
        throw new HttpException(
          'Document type and number are required',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (documentType !== 'C' && documentType !== 'P') {
        throw new HttpException(
          'Invalid document type',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (
        documentType === this.clientData.type &&
        documentNumber === this.clientData.documentNumber
      ) {
        return {
          firstName: this.clientData.firstName,
          secondName: this.clientData.secondName,
          firstSurname: this.clientData.firstSurname,
          secondSurname: this.clientData.secondSurname,
          phone: this.clientData.phone,
          address: this.clientData.address,
          city: this.clientData.city,
        };
      } else {
        throw new HttpException('Client not found', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      // Si no es una HttpException, lo convertimos en una con un status 500
      if (!(error instanceof HttpException)) {
        throw new HttpException(
          'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      throw error;
    }
  }
}
