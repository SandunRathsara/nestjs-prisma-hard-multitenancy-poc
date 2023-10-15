import { Injectable } from '@nestjs/common';
import { CreateInspectionDto } from '../dto/create-inspection.dto';
import { UpdateInspectionDto } from '../dto/update-inspection.dto';
import { MultiTenantPrismaClientService } from '../../../utils/multi-tenant/multi-tenant-prisma-client.service';

@Injectable()
export class InspectionService {
  constructor(private readonly prismaService: MultiTenantPrismaClientService) {}

  async create(createInspectionDto: CreateInspectionDto) {
    const prisma = await this.prismaService.getClient();

    return prisma.inspection.create({ data: createInspectionDto });
  }

  async findAll() {
    const prisma = await this.prismaService.getClient();

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
