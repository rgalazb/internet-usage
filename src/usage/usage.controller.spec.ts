import { Test, TestingModule } from '@nestjs/testing';
import { UsageService } from './usage.service';
import { getModelToken } from '@nestjs/mongoose';
import { Usage } from './schemas/usage.schema';
import { Model } from 'mongoose';
import { UpdateUsageDto } from './dto/updateUsage.dto';
import * as mongoose from 'mongoose';

const mockUsageModel = () => ({
  findOneAndUpdate: jest.fn(),
});

describe('UsageService', () => {
  let service: UsageService;
  let model: Model<Usage>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsageService,
        { provide: getModelToken(Usage.name), useValue: mockUsageModel() },
      ],
    }).compile();

    service = module.get<UsageService>(UsageService);
    model = module.get<Model<Usage>>(getModelToken(Usage.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should update a usage document and return the updated document', async () => {
    const updateUsageDto: UpdateUsageDto = {
      region: 'Test Region',
      year: 2021,
      percentage: 50,
      source: 'Test Source',
    };

    const id = '60d0fe4f5311236168a109ca';
    const objectId = new mongoose.Types.ObjectId(id);
    const updatedUsage = {
      ...updateUsageDto,
      _id: objectId,
    };

    (model.findOneAndUpdate as jest.Mock).mockResolvedValue(updatedUsage);

    const result = await service.update(updateUsageDto, id);

    expect(model.findOneAndUpdate).toHaveBeenCalledWith(
      { _id: objectId },
      {
        region: 'Test Region',
        year: 2021,
        percentage: 50,
        source: 'Test Source',
      },
      { new: true },
    );

    expect(result).toEqual(updatedUsage);
  });
});
