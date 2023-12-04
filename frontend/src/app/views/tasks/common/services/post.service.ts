import { Injectable } from '@angular/core';
import {Post} from '@app/views/tasks/participants/types/post';
import {ApiConfig} from '@app/configs/api.config';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getPosts(hashtag_id, media_type: number = null){
    let params = {hashtag_id}
    if (media_type){
      params = Object.assign(params, {media_type})
    }
    return this.http.get<Post[]>(ApiConfig.post_list, {withCredentials:true, params})
  }
}
