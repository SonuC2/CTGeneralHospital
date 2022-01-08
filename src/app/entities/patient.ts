import { Allergy } from "./allergy";
import { EmergencyInfo } from "./emergency-info";

export class Patient {

 patientId!:number;
 firstName!:string;
 lastName!:string;
 dateOfBirth!:string;
 mobileNo!:number;
 gender!:string;
 race!:string;
 ethnicity!:string;
 email!:string;
 language!:string[];
 address!:string;
 status!:string;
 allergy!:Allergy[];
 emergencyContactDetails!:EmergencyInfo;

}
