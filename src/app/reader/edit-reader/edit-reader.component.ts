import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Reader } from '../../models/reader';
import { DataService } from '../../core/data.service';
import { BadgeService } from '../../services/badge.service';

@Component({
  selector: 'app-edit-reader',
  templateUrl: './edit-reader.component.html',
  styleUrls: ['./edit-reader.component.scss'],
  providers: [BadgeService]
})
export class EditReaderComponent implements OnInit {

  selectedReader: Reader;
  currentBadge: string;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private badgeService: BadgeService
    ) { }

  ngOnInit() {
    let readerID: number = parseInt(this.route.snapshot.params['id']);
    this.dataService.getAllReaderById(readerID)
      .subscribe(
        (data: Reader) => this.selectedReader = data,
        (err: any) => console.log(err)
      );

    this.currentBadge = this.badgeService.getReaderBadge(this.selectedReader.totalMinutesRead);
  }

  saveChanges(): void {
    this.dataService.updateReader(this.selectedReader)
      .subscribe(
        (data: void) => console.log(`${this.selectedReader.name} update successfully.`),
        (err: any) => console.log(err)
      );
  }

}
