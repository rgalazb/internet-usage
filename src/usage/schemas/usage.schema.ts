import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UsageDocument = HydratedDocument<Usage>;

@Schema({
  collection: 'usage',
})
export class Usage {
  @Prop()
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({
    alias: 'region',
    isRequired: true,
  })
  'Region/Country/Area': string;

  @Prop({
    alias: 'year',
    isRequired: true,
  })
  Year: number;

  @Prop({
    alias: 'percentage',
    isRequired: true,
  })
  'Percentage of individuals using the internet': number;

  @Prop({
    alias: 'source',
    isRequired: true,
  })
  Source: string;
}

export const UsageSchema = SchemaFactory.createForClass(Usage);
