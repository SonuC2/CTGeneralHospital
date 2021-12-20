import { Allergy } from "./allergy";
import { EmergencyInfo } from "./emergency-info";

export class Patient {

    private patientId!:number;
    private firstName!:string;
    private lastName!:string;
    private mobileNo!:number;
    private gender!:string;
    private race!:string;
    private ethnicity!:string;
    private email!:string;
    private language!:string[];
    private address!:string;
    private allergy!:Allergy[];
    private emergencyContactDetails!:EmergencyInfo[];

}
