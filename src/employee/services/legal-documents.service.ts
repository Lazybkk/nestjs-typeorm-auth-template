import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LegalDocument } from '../entities/legal-document.entity';
import { Dependent } from '../entities/dependent.entity';

@Injectable()
export class LegalDocumentsService {
  constructor(
    @InjectRepository(LegalDocument)
    private legalDocumentRepository: Repository<LegalDocument>,
    @InjectRepository(Dependent)
    private dependentRepository: Repository<Dependent>,
  ) {}

  async uploadDocument(
    dependentId: number,
    file: Express.Multer.File,
  ): Promise<LegalDocument> {
    const dependent = await this.dependentRepository.findOne({
      id: dependentId,
    });
    if (!dependent) {
      throw new NotFoundException(`Dependent with ID ${dependentId} not found`);
    }

    const document = this.legalDocumentRepository.create({
      documentType: file.mimetype, // You might want to map mimetypes to document types
      filePath: file.path,
      dependent,
    });
    return this.legalDocumentRepository.save(document);
  }

  async findAllByDependentId(dependentId: number): Promise<LegalDocument[]> {
    const dependent = await this.dependentRepository.findOne({
      id: dependentId,
    });
    if (!dependent) {
      throw new NotFoundException(`Dependent with ID ${dependentId} not found`);
    }
    return this.legalDocumentRepository.find({ dependent });
  }

  async remove(id: number): Promise<{ affected?: number }> {
    const document = await this.legalDocumentRepository.findOne({ id });
    if (!document) {
      throw new NotFoundException(`Document with ID ${id} not found`);
    }
    // Remove the file from storage if needed (depending on your storage strategy)
    // ...
    return this.legalDocumentRepository.delete(id);
  }
}
