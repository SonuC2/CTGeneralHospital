import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointments } from 'src/app/entities/appointments';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-requested-appointment',
  templateUrl: './requested-appointment.component.html',
  styleUrls: ['./requested-appointment.component.css'],
})
export class RequestedAppointmentComponent implements OnInit {
  appointmentData: Appointments[] = [];
  dataSource = new MatTableDataSource<Appointments>();

  constructor(
    private docterService: DoctorService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    
    this.docterService
      .getRequestedAppointmentList()
      .subscribe((appointment) => {
        this.appointmentData = appointment;
        this.dataSource.data = this.appointmentData;
        console.log('Data source : ', this.dataSource.data);
      });
  }

  displayedColumns: string[] = [
    'meetingTitle',

    'specialisation',
    'appointmentDate',
    'timeSlot',
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

  cancelAppointment(element: Appointments) {
    console.log(element);
   
    this.docterService.cancelAppointment(element).subscribe();
    // this.router.navigate(['scheduling/appointment-list']);
    window.location.reload();
  }

  approveAppointment(element: Appointments) {
    console.log(element);

    this.docterService.approveAppointment(element).subscribe();
    window.location.reload();
  }
}
