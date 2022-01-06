import { Time } from "@angular/common";


export class Appointments {
  appointmentTime!: string;
  specialisation!: string;
  physician!: string;
  meetingTitle!: string;
  description!: string;
  appointmentDate!:String;
  reason!:String;
  rescheduleDate!:Date;
  rescheduleTime!:Time;
  appointmentStatus!:String;
}
