import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-reply-note-dialog',
  templateUrl: './reply-note-dialog.component.html',
  styleUrls: ['./reply-note-dialog.component.css']
})
export class ReplyNoteDialogComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<ReplyNoteDialogComponent>) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
