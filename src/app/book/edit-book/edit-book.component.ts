import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Book } from '../../models/book';
import { DataService } from '../../core/data.service';
import { LoggerService } from '../../core/logger.service';
import { OldBook } from '../../models/oldBook';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent implements OnInit {

  selectedBook: Book;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private loggerService: LoggerService
    ) { }

  ngOnInit() {
    let bookID: number = parseInt(this.route.snapshot.params['id']);
    this.dataService.getAllBookById(bookID)
      .subscribe(
        (data: Book) => this.selectedBook = data[0],
        (err: any) => console.log(err)
      );
    
    this.dataService.getOldBookId(bookID)
      .subscribe(
        (data: OldBook) => console.log(`Old book title: ${data.bookTitle}`)
      );
  }

  setMostPopular(): void {
    this.dataService.setMostPopularBook(this.selectedBook[0]);
    this.loggerService.log(`New most popular book: ${this.selectedBook.title}`);
  }

  saveChanges(): void {
    this.dataService.updateBook(this.selectedBook)
      .subscribe(
        (data: void) => console.log(`${this.selectedBook.title} update successfully.`),
        (err: any) => console.log(err)
      );
  }

}
