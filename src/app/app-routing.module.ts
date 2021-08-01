import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { BooksResolverService } from './core/books-resolver.service';

const routes = [
  { path: 'dashboard', component: DashboardComponent, resolve: { resolvedBooks: BooksResolverService } },
  { path: 'book', loadChildren: () => import('./book/book.module').then(m => m.BookModule) },
  { path: 'reader', loadChildren: () => import('./reader/reader.module').then(m => m.ReaderModule) },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
