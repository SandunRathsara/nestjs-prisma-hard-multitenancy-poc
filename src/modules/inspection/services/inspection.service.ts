import { Injectable } from '@nestjs/common';
import { CreateInspectionDto } from '../dto/create-inspection.dto';
import { UpdateInspectionDto } from '../dto/update-inspection.dto';
import { PrismaClient } from '@prisma/client';
import { MultiTenantPrismaClientService } from '../../../utils/multi-tenant-prisma-client/multi-tenant-prisma-client.service';

@Injectable()
export class InspectionService {
  constructor(private readonly prismaService: MultiTenantPrismaClientService) {}

  create(createInspectionDto: CreateInspectionDto) {
    const prisma = this.prismaService.getClient();

    return prisma.inspection.create({ data: createInspectionDto });
  }

  findAll() {
    const prisma = this.prismaService.getClient();

    return prisma.inspection.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} inspection`;
  }

  update(id: number, updateInspectionDto: UpdateInspectionDto) {
    return `This action updates a #${id} inspection`;
  }

  remove(id: number) {
    return `This action removes a #${id} inspection`;
  }
}
