import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Timeslot } from 'src/app/entities/timeslot';
import { TimeslotService } from 'src/app/services/timeslot.service';

@Component({
  selector: 'app-timeslot-list',
  templateUrl: './timeslot-list.component.html',
  styleUrls: ['./timeslot-list.component.css'],
})
export class TimeslotListComponent implements OnInit {
  timeslot: Timeslot[] = [];
  dataSource = new MatTableDataSource<Timeslot>();
  constructor(private timeslotService: TimeslotService) {}

  displayedColumns: string[] = ['date', 'startTime', 'endTime','slotStatus','action'];

  ngOnInit(): void {
    this.timeslotService.getAllTimeSlot().subscribe((newtimeslot) => {
      this.timeslot = newtimeslot;
      this.dataSource.data = this.timeslot;
      console.log('Data source : ', this.dataSource.data);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  deleteById() {}
}
