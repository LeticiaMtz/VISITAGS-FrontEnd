import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Comments} from '../models/comments';
@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  selectedComment: Comments;
  comments: Comments[];
  readonly URL_API = 'http://localhost:3000/comments';
  readonly comments_url = 'http://localhost:3000/comments/data';
  constructor(private http : HttpClient) {
    this.selectedComment = new Comments();
   }

   getComments(){
     return this.http.get(this.URL_API);
   }

   getCommentsByAlerts(){
     return this.http.get(this.comments_url);
   }

   postComment(comment: Comments){
     return this.http.post(this.URL_API,comment );
   }
}
