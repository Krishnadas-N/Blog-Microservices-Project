// add-post-component.component.ts
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FeedLoadService } from '../../Services/feed/feed-load.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-add-post-component',
  templateUrl: './add-post-component.component.html',
  styleUrls: ['./add-post-component.component.css']
})
export class AddPostComponentComponent {
  postForm: FormGroup;
  fileName: string | null = '';
  file!:File
  @ViewChild('fileInput') fileInputRef!: ElementRef<HTMLInputElement>;
  constructor(
    private dialogRef: MatDialogRef<AddPostComponentComponent>,
    private fb: FormBuilder,
    private uploadPost:FeedLoadService,
    private _snackBar: MatSnackBar
  ) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.postForm.valid) {
      const title = this.postForm.get('title')!.value; // Accessing title value using get()
    const description = this.postForm.get('description')!.value; // Accessing description value using get()

    console.log(`Title: ${title}`);
    console.log(`Description: ${description}`);
    console.log(this.file)
    this.uploadPost.uploadFile(title, description, this.file).subscribe(
      (res) => {
        // Handle successful response here
        console.log('Response:', res);
        this._snackBar.open('File uploaded successfully', 'Close', {
          duration: 2000, // Duration in milliseconds
        });
      },
      (error) => {
        // Handle error response here
        console.error('Error:', error);
        this._snackBar.open('Error uploading file', 'Close', {
          duration: 2000, // Duration in milliseconds
        });
      }
    );
    } else {
      console.error('Form is invalid:', this.postForm.errors);
    }
  }

  handleFileChange(event: any) {
    console.log("called");
    const file = event.target.files[0];
    if (file) {
      this.file=file
      this.fileName = file.name;
      // Handle file upload logic here (e.g., call a service)
    } else {
      this.fileName = null; // Reset filename if no file selected
    }
  }

  openFileSelector() {
    this.fileInputRef.nativeElement.click();
  }

  onClose() {
    this.dialogRef.close();
  }
}
