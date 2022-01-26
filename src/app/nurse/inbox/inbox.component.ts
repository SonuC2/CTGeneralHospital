import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/entities/employee';
import { EmployeeDTO } from 'src/app/entities/employee-dto';
import { Inbox } from 'src/app/entities/inbox';
import { User } from 'src/app/entities/user';
import { InboxService } from 'src/app/services/inbox.service';
import { ReplyNoteDialogComponent } from '../reply-note-dialog/reply-note-dialog.component';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  sendNoteForm!: any;
  employees!: EmployeeDTO[];
  specialisationControl!:FormControl;
  designation!:string
  sentNotes !:Inbox[];
  receivedNote !: Inbox[];
  private inbox !: Inbox[];



  displayedColumnsSent: string[] = ['receiverId','receiverName', 'receiverSpecialisation', 'messege','sendNoteTime', 'urgencyLevel','actions'];
  displayedColumnsReceived: string[] = ['senderId','senderName', 'senderSpecialisation', 'messege','sendNoteTime', 'urgencyLevel','actions'];
  dataSourceSent = new MatTableDataSource<Inbox>();
  dataSourceReceived = new MatTableDataSource<Inbox>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  senderId !:number;
  receiverId!:number;
  userDetailsFromLogin!:User;
  employeeDetailsFromLogin!:Employee;

  
  constructor(private fb: FormBuilder,private router: Router,private route: ActivatedRoute, private inboxService: InboxService,public dialog: MatDialog) { }

  selectedEmployee: any;
  ngOnInit(): void {
    this.userDetailsFromLogin = JSON.parse(sessionStorage.getItem('userDetails') || '{}');
    console.log("User Details from login: ", this.userDetailsFromLogin);

    if(this.userDetailsFromLogin.userRoleId.roleType === "Physician"){
      this.employeeDetailsFromLogin = JSON.parse(sessionStorage.getItem('physicianDetailsFromLogin') || '{}');
      console.log("Physician Details from login: ", this.employeeDetailsFromLogin);
    }
    if(this.userDetailsFromLogin.userRoleId.roleType === "Nurse"){
      this.employeeDetailsFromLogin = JSON.parse(sessionStorage.getItem('nurseDetailsFromLogin') || '{}');
      console.log("Nurse Details from login: ", this.employeeDetailsFromLogin);
    }

    this.sendNoteForm = this.fb.group({
      receiverId: [''],
      receiverName:[''],
      receiverSpecialisation:[''],
      senderId:[''],
      senderName:[''],
      senderSpecialisation:[''],
      messege:[''],
      urgencyLevel:[''],
      responseStatus:['']
    });

    this.senderId = 1;
    this.receiverId =1;
    this.inboxService.getAllEmployeeList().subscribe(employees =>{
      this.employees = employees;
      console.log("Employee details in Inbox: " , this.employees);
      
    })


    // this.senderId = this.sendNoteForm.controls['receiverName'].value;
    

    // this.dataSourceSent = new MatTableDataSource();

  }

  ngAfterViewInit() {
    this.dataSourceSent.paginator = this.paginator;
    this.dataSourceSent.sort = this.sort;

    this.dataSourceReceived.paginator = this.paginator;
    this.dataSourceReceived.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceSent.filter = filterValue.trim().toLowerCase();

    console.log("filter value", filterValue);
    
    if (this.dataSourceSent.paginator) {
      this.dataSourceSent.paginator.firstPage();
    }
  }

  applyFilter1(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceReceived.filter = filterValue.trim().toLowerCase();

    console.log("filter value", filterValue);
    
    if (this.dataSourceReceived.paginator) {
      this.dataSourceReceived.paginator.firstPage();
    }
  }


  sendNote() {

    
    this.sendNoteForm.controls['senderId'].setValue(this.employeeDetailsFromLogin.employeeId);
      let name = this.employeeDetailsFromLogin.title + " " + this.employeeDetailsFromLogin.firstName + " " + this.employeeDetailsFromLogin.lastName;
      this.sendNoteForm.controls['senderName'].setValue(name);
      this.sendNoteForm.controls['senderSpecialisation'].setValue(this.employeeDetailsFromLogin.specialisation);
      console.log("form: ",this.sendNoteForm.value);
    this.inboxService.sendNote(this.sendNoteForm.value).subscribe();
    
    this.sendNoteForm.reset();
    console.log('note is sent');
  }

  loadDesignation(employee: EmployeeDTO, event:any){
    console.log("inside loadd")
    // alert(this.selectedEmployee.designation)
    console.log("Emp details in load " , event) 
    if(event.isUserInput){
      console.log("designation: " , employee.specialisation);
      this.sendNoteForm.controls['receiverId'].setValue(employee.employeeId);
      let name = employee.firstName + " " + employee.lastName
      this.sendNoteForm.controls['receiverName'].setValue(name);

      this.sendNoteForm.controls['receiverSpecialisation'].setValue(employee.specialisation);
    }
   
    // this.designation = employee.specialisation;
  }

  attributeDisplay(employee1:Employee,employee2 : Employee){
    if (employee1.employeeId == employee2.employeeId ) {
      return employee1.firstName + " " + employee1.lastName;
    } else {
      return "";
    }
  }

  sentNotesTabClick(){
    console.log("Tab clicked")
  }

  onTabClick(event:any){
    console.log(event);
    console.log(event.tab.textLabel);

    if(event.index === 1){
      console.log("sent notes tab clicked");

   
    // console.log("sender id: ", this.senderId);
    
    this.inboxService.getAllSentNote(this.employeeDetailsFromLogin.employeeId).subscribe(sentNotes =>{
      this.sentNotes = sentNotes;
      this.dataSourceSent.data = this.sentNotes
      console.log("Data source : " , this.dataSourceSent.data);     
     // console.log("message:" );
      
    })
      
    }

    if(event.index === 2){
      console.log("received notes tab clicked");

      this.receiverId = 1;
    console.log("receiver id: ", this.receiverId);
    
    // this.inboxService.getAllReceivedNote(this.senderId).subscribe(receivedNotes =>{
      this.inboxService.getAllReceivedNote(this.employeeDetailsFromLogin.employeeId).subscribe(receivedNotes =>{
      this.receivedNote = receivedNotes;
      this.dataSourceReceived.data = this.receivedNote
      console.log("Data source : " , this.dataSourceReceived.data);     
    })   
    }

  }

  sendReplyFromSentNotes(row:any){
    console.log("Row data from sent notes: ", row);

    //  this.openDialog();
     const dialogRef = this.dialog.open(ReplyNoteDialogComponent,{
      width: '500px',
      data: {
        receiverId: row.receiverId,
        receiverName : row.receiverName,
        receiverSpecialisation : row.receiverSpecialisation,
        senderId:row.senderId,
        senderName: row.senderName,
        senderSpecialisation : row.senderSpecialisation,
        messege:row.messege,
        urgencyLevel:row.urgencyLevel
      },
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result:',result);
      if(result){
        this.sendNoteForm.controls['senderId'].setValue(this.employeeDetailsFromLogin.employeeId);
        let name = this.employeeDetailsFromLogin.title + " " + this.employeeDetailsFromLogin.firstName + " " + this.employeeDetailsFromLogin.lastName;
      this.sendNoteForm.controls['senderName'].setValue(name);
      this.sendNoteForm.controls['senderSpecialisation'].setValue(this.employeeDetailsFromLogin.specialisation);
      this.sendNoteForm.controls['receiverId'].setValue(result.receiverId);
      this.sendNoteForm.controls['receiverName'].setValue(result.receiverName);
      this.sendNoteForm.controls['receiverSpecialisation'].setValue(result.receiverSpecialisation);
      this.sendNoteForm.controls['messege'].setValue(result.messege);
      this.sendNoteForm.controls['urgencyLevel'].setValue(result.urgencyLevel);
      console.log("Dialog form content: " , this.sendNoteForm.value);
 
      }
    });
  }

  openDialog(){
    const dialogRef = this.dialog.open(ReplyNoteDialogComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result from inbox: ',result);
    });
  }

}
