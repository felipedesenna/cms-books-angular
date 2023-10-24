import { Component, OnInit, Version, VERSION } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { Book } from '../models/book';
import { Reader } from '../models/reader';
import { LoggerService } from '../core/logger.service';
import { DataService } from '../core/data.service';
import { BookTrackerError } from '../models/bookTrackerError';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  allBooks: Book[];
  allReaders: Reader[];
  mostPopularBook: Book;

  constructor(
    private loggerService: LoggerService,
    private dataService: DataService,
    private title: Title,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    let resolvedData: Book[] | BookTrackerError = this.route.snapshot.data['resolvedBooks'];

    if (resolvedData instanceof BookTrackerError) {
      console.log(`Dashboard component error: ${resolvedData.friendlyMessage}`);
    } else {
      this.allBooks = resolvedData;
    }

    this.dataService.getAllReaders()
      .subscribe(
        (data: Reader[]) => this.allReaders = data,
        (err: BookTrackerError) => console.log(err.friendlyMessage),
        () => this.loggerService.log('All done getting readers!')
      );

    this.mostPopularBook = this.dataService.mostPopularBook;

    this.getAuthorRecommendationAsync(1);

    this.title.setTitle(`Book Tracker ${VERSION.full}`);

    this.loggerService.log('Done with dashboard initialization')

    throw new Error('Ugly technical error!');
  }

  private async getAuthorRecommendationAsync(readerID: number): Promise<void> {
    try {
      let author: string = await this.dataService.getAuthorRecommendation(readerID);
      this.loggerService.log(author);
    } catch (error) {
      this.loggerService.error(error);
    }
  }

  deleteBook(bookID: number): void {
    this.dataService.deleteBook(bookID)
      .subscribe(
        (data: void) => {
          let index: number = this.allBooks.findIndex(book => book.id === bookID);
          this.allBooks.splice(index, 1);
        },
        (err: any) => console.log(err)
      );
  }

  deleteReader(readerID: number): void {
    this.dataService.deleteReader(readerID)
      .subscribe(
        (data: void) => {
          let index: number = this.allReaders.findIndex(reader => reader.id === readerID);
          this.allReaders.splice(index, 1);
        },
        (err: any) => console.log(err)
      );
  }

}
