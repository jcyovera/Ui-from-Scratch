import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Article } from './models/article.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  apiUrl = 'http://localhost:3000/articles';

  constructor(private _http: HttpClient) { }

  getList(): Observable<Article[]> {
    return this._http.get<Article[]>(this.apiUrl).pipe();
  }
}
