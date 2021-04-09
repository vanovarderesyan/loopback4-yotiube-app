import { Entity, model, property } from '@loopback/repository';

@model()
export class Youtubelist extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
  })
  id?: number;

  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'string',
  })
  videoLink?: string;

  @property({
    type: 'string',
  })
  videoId?: string;

  @property({
    type: 'string',
  })
  title?: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'string',
  })
  channelId?: string;

  @property({
    type: 'string',
  })
  client?: string;


  constructor(data?: Partial<Youtubelist>) {
    super(data);
  }
}

export interface YoutubelistRelations {
  // describe navigational properties here
}

export type YoutubelistWithRelations = Youtubelist & YoutubelistRelations;
