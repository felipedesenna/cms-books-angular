import { Component, OnInit } from '@angular/core';

import { Reader } from '../../models/reader';
import { DataService } from '../../core/data.service';

@Component({
  selector: 'app-add-reader',
  templateUrl: './add-reader.component.html',
  styleUrls: ['./add-reader.component.scss']
})
export class AddReaderComponent implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  saveReader(formValues: any): void {
    let newReader: Reader = <Reader>formValues;
    newReader.readerID = 0;
    console.log(newReader);

    this.dataService.addReader(newReader)
      .subscribe(
        (data: Reader) => console.log(data),
        (err: any) => console.log(err)
      );
  }

}
