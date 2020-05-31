// Copyright IBM Corp. 2018,2019. All Rights Reserved.
// Node module: @loopback/example-todo
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {inject} from '@loopback/core';
import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {User, UserRelations} from '@loopback/authentication-jwt';

export class MyUserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {
  constructor(@inject('datasources.ds') dataSource: juggler.DataSource) {
    super(User, dataSource);
  }
}
