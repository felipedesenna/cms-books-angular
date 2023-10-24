import { Book } from './models/book';
import { Reader } from './models/reader';

export const allReaders: Reader[] = [
    { id: 1, name: 'Marie', weeklyReadingGoal: 400, totalMinutesRead: 60 },
    { id: 2, name: 'Daniel', weeklyReadingGoal: 210, totalMinutesRead: 35 },
    { id: 3, name: 'Lanier', weeklyReadingGoal: 140, totalMinutesRead: 20 }
];

export const allBooks: Book[] = [
    { id: 1, title: 'AngularJS', author: 'Joe Papa', publicationYear: 2019 },
    { id: 2, title: 'Angular 2', author: 'Rodrigo Branas', publicationYear: 2020 },
    { id: 3, title: 'Angular 4', author: 'Andre Gomes', publicationYear: 2018 },
    { id: 4, title: 'Angular 6', author: 'Joe Papa', publicationYear: 2017 },
    { id: 5, title: 'Angular 8', author: 'Rodrigo Branas', publicationYear: 2011 },
    { id: 6, title: 'Angular Ivy', author: 'Andre Gomes', publicationYear: 2000 }
];
