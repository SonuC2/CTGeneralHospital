import { Appointments } from "./appointments";
import { Diagnosis } from "./diagnosis";
import { Medication } from "./medication";
import { Prescription } from "./prescription";
import { Procedure } from "./procedure";

export class PatientVisit {
     patientVisitId!:number;
	
	height!:string;
	weight!:string;
	bloodPressure!:string;
	bodyTemperature!:string;
	respirationRate!:string;
	patientId!:number;
	patientName!:string;
    appointment!:Appointments;
    prescription!:Prescription[];
    diagnosis!:Diagnosis[];
    procedure!:Procedure[];
	visitStatus!:string;
	medication!:Medication[];
}
