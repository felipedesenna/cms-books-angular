import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { Reader } from '../models/reader';
import { allBooks } from '../data';
import { Book } from '../models/book';
import { BookTrackerError } from '../models/bookTrackerError';
import { OldBook } from '../models/oldBook';
import { User, UserLogin } from '../models/user';

@Injectable()
export class DataService {

  url = 'http://localhost:3000';
  authData: any = [];
  mostPopularBook: Book = allBooks[0];

  getAuthorRecommendation(readerID: number): Promise<string> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (readerID > 0) {
          resolve('Dr. Seuss');
        } else {
          reject('Invalid reader ID');
        }
      }, 2000);
    })
  }

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse): Observable<BookTrackerError> {
    let dataError = new BookTrackerError();
    dataError.errorNumber = 100;
    dataError.message = error.statusText;
    dataError.friendlyMessage = 'An error occurred retrieving data.';
    return throwError(dataError);
  }

  getAllReaders(): Observable<Reader[] | BookTrackerError> {
    return this.http.get<Reader[]>(`${this.url}/readers`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getAllReaderById(id: number): Observable<Reader> {
    return this.http.get<Reader>(`${this.url}/readers/${id}`, {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.authData.token}`
      })
    });
  }

  getAllBooks(): Observable<Book[] | BookTrackerError> {
    return this.http.get<Book[]>(`${this.url}/books`)
      .pipe(
        catchError(err => this.handleError(err))
      );
  }

  getAllBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.url}/books/${id}`, {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.authData.token}`
      })
    });
  }

  getOldBookId(id: number): Observable<OldBook> {
    return this.http.get<Book>(`${this.url}/books/${id}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.authData.token}`
      })
    })
      .pipe(
        map(b => <OldBook>{
          bookTitle: b.title,
          year: b.publicationYear
        }),
        tap(classicBook => console.log(classicBook))
      );
  }

  setMostPopularBook(popularBook: Book): void {
    this.mostPopularBook = popularBook;
  }

  authUser(auth: UserLogin): Observable<UserLogin> {
    return this.http.post<UserLogin>(`${this.url}/auth`, auth, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  addUser(newUser: User): Observable<User> {
    return this.http.post<User>(`${this.url}/users`, newUser, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  addBook(newBook: Book): Observable<Book> {
    return this.http.post<Book>(`${this.url}/books`, newBook, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authData.token}`
      })
    });
  }

  updateBook(updateBook: Book): Observable<void> {
    return this.http.put<void>(`${this.url}/books/${updateBook.id}`, updateBook, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authData.token}`
      })
    });
  }

  deleteBook(bookID: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/books/${bookID}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.authData.token}`
      })
    });
  }

  addReader(newReader: Reader): Observable<Reader> {
    return this.http.post<Reader>(`${this.url}/readers`, newReader, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authData.token}`
      })
    });
  }

  updateReader(updateReader: Reader): Observable<void> {
    return this.http.put<void>(`${this.url}/readers/${updateReader.id}`, updateReader, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authData.token}`
      })
    });
  }

  deleteReader(readerID: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/readers/${readerID}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.authData.token}`
      })
    });
  }

  get isLoggedIn(): boolean {
    return !!this.authData.users;
  }

  logout(): void {
    this.authData.users = null;
  }
}
