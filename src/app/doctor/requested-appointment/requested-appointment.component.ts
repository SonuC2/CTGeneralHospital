import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointments } from 'src/app/entities/appointments';
import { DoctorService } from 'src/app/services/doctor.service';
import { SchedulingService } from 'src/app/services/scheduling.service';

@Component({
  selector: 'app-requested-appointment',
  templateUrl: './requested-appointment.component.html',
  styleUrls: ['./requested-appointment.component.css'],
})
export class RequestedAppointmentComponent implements OnInit {
  appointmentData: Appointments[] = [];
  dataSource = new MatTableDataSource<Appointments>();
  userDetailsFromLogin: any;
  employeeDetailsFromLogin: any;

  constructor(
    private docterService: DoctorService,
    private router: Router,
    private route: ActivatedRoute,
    private scheduleService: SchedulingService,
  ) {}

  ngOnInit(): void {
    
    this.userDetailsFromLogin = JSON.parse(sessionStorage.getItem('userDetails') || '{}');
    console.log("User Details from login: ", this.userDetailsFromLogin);

    if(this.userDetailsFromLogin.userRoleId.roleType === "Physician"){
      this.employeeDetailsFromLogin = JSON.parse(sessionStorage.getItem('physicianDetailsFromLogin') || '{}');
      console.log("Physician Details from login: ", this.employeeDetailsFromLogin);

      
      // this.schedulingService.getAppointmentForEmployee(this.employeeDetailsFromLogin.employeeId).subscribe(appointment =>{
      //   this.appointmentData = appointment;
      //   this.dataSource.data = this.appointmentData;
      //   console.log('Data source : ', this.dataSource.data);
      // })
      this.scheduleService.getRequestedAppointmentForEmployee(this.employeeDetailsFromLogin.employeeId).subscribe((appointment) => {
        this.appointmentData = appointment;
        this.dataSource.data = this.appointmentData;
        console.log('Data source : ', this.dataSource.data);
      });
    }
  
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
