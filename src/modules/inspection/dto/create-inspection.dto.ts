import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateInspectionDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  policyNumber: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  policyHolder: string;
}
