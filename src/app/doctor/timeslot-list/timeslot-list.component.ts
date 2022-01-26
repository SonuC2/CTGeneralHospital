import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/entities/employee';
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
  constructor(private timeslotService: TimeslotService, private router:ActivatedRoute, private route:Router) {}
  physicianDetailsFromLogin!:Employee;
  displayedColumns: string[] = ['date', 'startTime', 'endTime','slotStatus','action'];

  ngOnInit(): void {

    this.physicianDetailsFromLogin = JSON.parse(sessionStorage.getItem('physicianDetailsFromLogin') || '{}');
    console.log("PAtient Details from login: ", this.physicianDetailsFromLogin);

    this.timeslotService.getAllTimeSlot(this.physicianDetailsFromLogin.employeeId).subscribe((newtimeslot) => {
      this.timeslot = newtimeslot;
      this.dataSource.data = this.timeslot;
      console.log('Data source : ', this.dataSource.data);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  editRoute(element:Timeslot){
    console.log(element + "edit time slot ememnt"+ element.employeeId)

      this.route.navigate(['src/app/doctor/edit-timeslot/'+ element.employeeId])
  }

  deleteById(slotId:number){
    console.log("hello slot id for delete functionality",slotId);
    this.timeslotService.deleteTimeSlotBySlotId(slotId).subscribe();
    window.location.reload();

  }
}
