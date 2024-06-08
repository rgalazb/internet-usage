import { Injectable } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Usage } from './schemas/usage.schema';
import { CreateUsageDto } from './dto/createUsage.dto';
import { UpdateUsageDto } from './dto/updateUsage.dto';

@Injectable()
export class UsageService {
  constructor(@InjectModel(Usage.name) private usageModel: Model<Usage>) {}

  async findAll(): Promise<Usage[]> {
    return this.usageModel.find({}).exec();
  }

  async findOne(id: string): Promise<Usage> {
    return this.usageModel.findOne({ _id: new mongoose.Types.ObjectId(id) });
  }

  async create(createUsageDto: CreateUsageDto): Promise<Usage> {
    const createdUsage = new this.usageModel({
      _id: new mongoose.Types.ObjectId(),
      ...createUsageDto,
    });
    return createdUsage.save();
  }

  async update(updateUsageDto: UpdateUsageDto, id: string): Promise<Usage> {
    return this.usageModel.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(id)},
      updateUsageDto,
      { new: true}
    )
  }

  async delete(id: string): Promise<Usage> {
    return this.usageModel.findOneAndDelete(
      {
        _id: new mongoose.Types.ObjectId(id),
      },
      { new: true },
    );
  }
}
