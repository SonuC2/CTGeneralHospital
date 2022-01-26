import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointments } from 'src/app/entities/appointments';
import { PatientVisit } from 'src/app/entities/patient-visit';
import { PatientVisitService } from 'src/app/services/patient-visit.service';
import { SchedulingService } from 'src/app/services/scheduling.service';

@Component({
  selector: 'app-visit-history',
  templateUrl: './visit-history.component.html',
  styleUrls: ['./visit-history.component.css']
})
export class VisitHistoryComponent implements OnInit {

  pId!:any;
  visitDetails:PatientVisit[] =[];
  appointmentDetails:Appointments[] = [];
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private patientVisitService:PatientVisitService,
    private schedulingService:SchedulingService
  ) { }

  ngOnInit(): void {

    if (this.route.snapshot.paramMap.get('patientId') !== null) {
      this.pId = this.route.snapshot.paramMap.get('patientId');
      console.log('id from patient list', this.pId)

      this.patientVisitService.getPatientVisitHistoryForPatient(this.pId).subscribe(response =>{
        // this.visitDetails = response;
        // console.log("Visit History", this.visitDetails);
        response.forEach(element =>{
          console.log("Element data: " ,  element)
          this.visitDetails.push(element);
        })

      })

      console.log("visit details" , this.visitDetails)
      

      // this.visitDetails.forEach()
    }
  }

  loadPrescription(appointmentId: any){

    console.log("inside load Prescription:" , appointmentId);
    
  }

}
