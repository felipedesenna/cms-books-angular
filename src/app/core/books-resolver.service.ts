import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Book } from '../models/book';
import { BookTrackerError } from '../models/bookTrackerError';
import { DataService } from './data.service';

@Injectable({
    providedIn: 'root'
})
export class BooksResolverService implements Resolve<Book[] | BookTrackerError> {

    constructor(private dataService: DataService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Book[] | BookTrackerError> {
        return this.dataService.getAllBooks()
            .pipe(
                catchError(err => of(err))
            );
    }
}
