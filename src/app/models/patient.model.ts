export class PatientData {
    constructor(
      public patient_id: number,
      public title: string,
      public first_name: string,
      public last_name: string,
      public gender: string,
      public dob: Date,
      public email: string,
      public contact: number,
      public address: string,
      public race: string,
      public ethenticity: string,
      public status: string,
      public block_status: string,
    ) {}
  }
  