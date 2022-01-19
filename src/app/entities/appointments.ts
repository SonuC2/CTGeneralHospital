import { Time } from "@angular/common";


export class Appointments {
  
  meetingTitle!: string;
  description!: string;
  specialisation!: string;
  employeeId!:number;
  employeeName!:String;
  appointmentDate!:Date;
  timeSlot!: number;
  reason!:String;
  rescheduleDate!:Date;
  rescheduleTimeSlot!:number;
  patientId!:number;
  patientName!:String;
  appointmentStatus!:String;

}
