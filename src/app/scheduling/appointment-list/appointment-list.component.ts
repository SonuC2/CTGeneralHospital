import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointments } from 'src/app/entities/appointments';
import { SchedulingService } from 'src/app/services/scheduling.service';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css'],
})
export class AppointmentListComponent implements OnInit {
  appointmentData: Appointments[] = [];
  dataSource = new MatTableDataSource<Appointments>();

  constructor(
    private schedulingService: SchedulingService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.schedulingService.getAllAppointmentList().subscribe((appointment) => {
      this.appointmentData = appointment;
      this.dataSource.data = this.appointmentData;
      console.log('Data source : ', this.dataSource.data);
    });
  }

  displayedColumns: string[] = [
    'meetingTitle',
    'physician',
    'specialisation',
    'appointmentDate',
    'appointmentTime',
    'appointmentStatus',
    'action',
  ];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //   navigateToUpdate(row:any){

  //  console.log("Row id: " + row);
  // // this.queryID= row.id;
  //  this.router.navigate(['/scheduling/edit-appointment/',row])
  // }

  deleteById(appointmentId: number) {
    console.log(appointmentId);

    this.schedulingService.deleteAppointmentById(appointmentId).subscribe();
    this.router.navigate(['scheduling/appointment-list']);
    window.location.reload();
  }
}
