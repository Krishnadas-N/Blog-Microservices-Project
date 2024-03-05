import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Post } from '../../models/postModel.model';
import { AddPostComponentComponent } from '../add-post-component/add-post-component.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-post-compoentnt',
  templateUrl: './add-post-compoentnt.component.html',
  styleUrl: './add-post-compoentnt.component.css'
})
export class AddPostCompoentntComponent {
 
  postForm: FormGroup; // Declare a FormGroup

  constructor(private fb: FormBuilder) {
    this.postForm = this.fb.group({
      title: ['', Validators.required], // Add validation for title
      content: ['', Validators.required] // Add validation for content
    });
  }

  onSubmit() {
    if (this.postForm.valid) {
      // Implement your logic to create a new post using the form data
      console.log('Form data:', this.postForm.value); // Example logging

      // You can use a service to communicate with your backend API
      // to create the new post and handle the response appropriately.

      // Close the dialog after successful submission (optional)
      // this.dialogRef.close('Post created successfully!'); // Assuming dialogRef is accessible
    } else {
      console.error('Form is invalid:', this.postForm.errors);
    }
  }
}
