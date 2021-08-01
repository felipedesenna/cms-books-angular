import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AddBookComponent } from './add-book/add-book.component';
import { EditBookComponent } from './edit-book/edit-book.component';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', component: AddBookComponent },
      { path: ':id/edit', component: EditBookComponent }
    ])
  ],
  declarations: [
    AddBookComponent,
    EditBookComponent
  ]
})
export class BookModule { }
