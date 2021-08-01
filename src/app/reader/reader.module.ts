import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AddReaderComponent } from './add-reader/add-reader.component';
import { EditReaderComponent } from './edit-reader/edit-reader.component';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', component: AddReaderComponent },
      { path: ':id/edit', component: EditReaderComponent }
    ])
  ],
  declarations: [
    AddReaderComponent,
    EditReaderComponent
  ]
})
export class ReaderModule { }
