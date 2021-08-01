import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';

import { DataService } from './data.service';
import { Book } from '../models/book';
import { BookTrackerError } from '../models/bookTrackerError';

describe('DataService Tests', () => {

    let dataService: DataService;
    let httpTestingController: HttpTestingController;

    let testBooks: Book[] = [
        { bookID: 1, title: 'AngularJS', author: 'Joe Papa', publicationYear: 2019 },
        { bookID: 2, title: 'Angular 2', author: 'Rodrigo Branas', publicationYear: 2020 },
        { bookID: 3, title: 'Angular 4', author: 'Andre Gomes', publicationYear: 2018 }
    ];

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [DataService]
        });

        dataService = TestBed.get(DataService);
        httpTestingController = TestBed.get(HttpTestingController);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should GET all books', () => {
        dataService.getAllBooks()
            .subscribe((data: Book[]) => {
                expect(data.length).toBe(3);
            });

        let booksRequest: TestRequest = httpTestingController.expectOne(`${dataService.url}/api/books`);
        expect(booksRequest.request.method).toEqual('GET');

        booksRequest.flush(testBooks);
    });

    it('should return a BookTrackerError', () => {
        dataService.getAllBooks()
            .subscribe(
                (data: Book[]) => fail('this should have been an error'),
                (err: BookTrackerError) => {
                    expect(err.errorNumber).toEqual(100);
                    expect(err.friendlyMessage).toEqual('An error occurred retrieving data.');
                }
            );

            let booksRequest: TestRequest = httpTestingController.expectOne(`${dataService.url}/api/books`);

            booksRequest.flush('error', {
                status: 500,
                statusText: 'Server Error'
            });
    });
});