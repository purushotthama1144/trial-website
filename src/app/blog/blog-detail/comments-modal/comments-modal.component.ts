import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommentsService } from 'src/app/service/comments/comments.service';
import { SnackbarService } from 'src/app/service/snackbar/snackbar.service';

@Component({
  selector: 'app-comments-modal',
  templateUrl: './comments-modal.component.html',
  styleUrls: ['./comments-modal.component.scss'],
  
})
export class CommentsModalComponent implements OnInit {
  commentForm = new FormGroup({
    comment: new FormControl('' , Validators.required),
    name: new FormControl('' , Validators.required),
    email: new FormControl('' , Validators.required),
    checkbox: new FormControl(false , Validators.required),
  });
  constructor(public dialog: MatDialog,
    private commentsService:CommentsService,
    private snackbarService: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
  }
  onSubmit(){
    const comments = {
      parent_id: this.data.id,
      user_name: this.commentForm.value.name,
      user_mail: this.commentForm.value.email,
      comment: this.commentForm.value.comment,
      checkbox: this.commentForm.value.checkbox,
      section: "ANT IQ"
    }
    this.commentsService.insertComment(comments)
      .subscribe((response) => {
        this.snackbarService.openSnackBar("mat-primary", response[0]);
        this.dialog.closeAll();
      }, (error) => {
        this.snackbarService.openSnackBar("mat-warn", error.error);
      })

  }
}
