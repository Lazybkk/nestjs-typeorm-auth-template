import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  UseInterceptors,
  UploadedFile,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { LegalDocumentsService } from '../services/legal-documents.service';
import { LegalDocument } from '../entities/legal-document.entity';

@Controller('dependents/:dependentId/documents')
export class LegalDocumentsController {
  constructor(private legalDocumentsService: LegalDocumentsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('document'))
  async upload(
    @Param('dependentId', ParseIntPipe) dependentId: number,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<LegalDocument> {
    return this.legalDocumentsService.uploadDocument(dependentId, file);
  }

  @Get()
  async findAll(
    @Param('dependentId', ParseIntPipe) dependentId: number,
  ): Promise<LegalDocument[]> {
    return this.legalDocumentsService.findAllByDependentId(dependentId);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    const result = await this.legalDocumentsService.remove(id);
    if (!result.affected) {
      throw new NotFoundException(`Document with ID ${id} not found`);
    }
  }
}
