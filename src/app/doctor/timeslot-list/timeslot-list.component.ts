import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Timeslot } from 'src/app/entities/timeslot';

@Component({
  selector: 'app-timeslot-list',
  templateUrl: './timeslot-list.component.html',
  styleUrls: ['./timeslot-list.component.css'],
})
export class TimeslotListComponent implements OnInit {
  timeslot!: Timeslot;
  dataSource = new MatTableDataSource<Timeslot>();
  constructor() {}

  displayedColumns: string[] = ['date', 'startTime', 'endTime'];
  ngOnInit(): void {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteById() {}
}
