import { Medication } from "./medication";

export class Prescription {
    prescriptionId!:number;
	quantity!:number;
	type!:string;
	timing!:string[];
    medication!:Medication;
}
