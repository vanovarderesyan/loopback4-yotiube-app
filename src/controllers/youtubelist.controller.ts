import {
  repository
} from '@loopback/repository';
import {
  authenticate
} from '@loopback/authentication';

import fetch from "node-fetch";

import {
  post,
  get,
  getModelSchemaRef,
  requestBody,
  HttpErrors
} from '@loopback/rest';
import { Youtubelist } from '../models';
import { YoutubelistRepository } from '../repositories';
import { resolve } from 'dns';
import { SecurityBindings, securityId, UserProfile } from '@loopback/security';
import { inject } from '@loopback/core';

export class YoutubelistController {
  constructor(
    @repository(YoutubelistRepository)
    public youtubelistRepository: YoutubelistRepository,
  ) { }
  @authenticate('jwt')
  @get('/my/youtubelist', {
    responses: {
      '200': {
        description: 'Youtubelist model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Youtubelist, {
              title: 'My Youtubelist',
              exclude: ['id'],
            })
          }
        },
      },
    },
  })

  async find(@inject(SecurityBindings.USER)
  requestUser: UserProfile): Promise<any> {
    return this.youtubelistRepository.find({ where: { client: requestUser[securityId] } });
  }

  @authenticate('jwt')
  @post('/youtubelist', {
    responses: {
      "200": {
        description: 'Youtubelist model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Youtubelist) } },
      },
    },
  })


  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Youtubelist, {
            title: 'NewYoutubelist',
            exclude: ['id'],
          }),
        },
      },
    })
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,

    youtubelist: Omit<Youtubelist, 'id'>,
  ): Promise<any> {
    let q = youtubelist['name']
    console.log(process.env.API_KEY);
    console.log(currentUserProfile);
    let res = await fetch(`${process.env.YOUTUB_URL}part=snippet&q=${q}&type=video&videoCaption=closedCaption&key=${process.env.API_KEY}`)
    let resJson = await res.json()
    let lenItems = resJson.items.length
    if (lenItems) {
      let music = resJson.items[0]
      let video = await this.youtubelistRepository.count({ client: currentUserProfile[securityId], videoId: music.id.videoId })
      console.log(video);
      if (video['count']) {
        throw new HttpErrors[400]('already exists video');
      }
      let sendData = {
        name: q,
        videoId: music.id.videoId,
        title: music.snippet.title,
        description: music.snippet.description,
        channelId: music.snippet.channelId,
        videoLink: `${process.env.YOUTUB_VIDEO_PREFIX_URL}${music.id.videoId}`,
        client: currentUserProfile[securityId]
      }
      return this.youtubelistRepository.create(sendData);

    } else {
      throw new HttpErrors[400]('empty search respons content');
    }
  }
}
