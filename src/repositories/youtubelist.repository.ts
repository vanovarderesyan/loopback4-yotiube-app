import { inject } from '@loopback/core';
import { DefaultCrudRepository } from '@loopback/repository';
import { DbDataSource } from '../datasources';
import { Youtubelist, YoutubelistRelations } from '../models';

export class YoutubelistRepository extends DefaultCrudRepository<
  Youtubelist,
  typeof Youtubelist.prototype.id,
  YoutubelistRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Youtubelist, dataSource);
  }
}
