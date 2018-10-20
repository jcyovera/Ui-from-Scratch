import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  message = 'Hello world';
  articles: any;
  constructor(private _articleService: ArticleService) { }

  ngOnInit() {
    this._articleService.getList().subscribe((result) => {
       console.log(result);
       this.articles = result;
    });
  }

}
