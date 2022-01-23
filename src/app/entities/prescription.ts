import { Medication } from "./medication";
import { PatientVisit } from "./patient-visit";

export class Prescription {
    prescriptionId!:number;
	quantity!:number;
	type!:string;
	timing!:string[];
    medication!:Medication;
	appointmentId!:number;
	patientVisit!:PatientVisit;
}
