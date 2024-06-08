import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CreateUsageDto } from './dto/createUsage.dto';
import { UpdateUsageDto } from './dto/updateUsage.dto';
import { UsageService } from './usage.service';

@Controller('usage')
export class UsageController {
  constructor(private readonly usageService: UsageService) {}

  @Get()
  async getAll() {
    return await this.usageService.findAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return await this.usageService.findOne(id);
  }

  @Post()
  async create(@Body() createUsageDto: CreateUsageDto) {
    return await this.usageService.create(createUsageDto);
  }

  @Patch(':id')
  async update(
    @Body() updateUsageDto: UpdateUsageDto,
    @Param('id') id: string,
  ) {
    return await this.usageService.update(updateUsageDto, id);
  }

  @Delete(':id')
  async delete(@Param() id: string) {
    return await this.usageService.delete(id);
  }
}
