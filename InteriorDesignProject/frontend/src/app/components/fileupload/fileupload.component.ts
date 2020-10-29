import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.css']
})
export class FileuploadComponent implements OnInit {
  fileToUpload: File = null;
  uploadForm: FormGroup;  
  error: string;
  uploadResponse = { status: '', message: '', filePath: '' };
  constructor(private userService: UserService,private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      myfile: ['', Validators.required]
    });
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('myfile').setValue(file);
      console.log(this.uploadForm)
      
    }
    
  }
  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.uploadForm.get('myfile').value);
    this.userService.fileUploadService(formData).subscribe(
      res => {
        this.uploadResponse = res;
        alert(res)
        this.router.navigate(['/highchart']);
     
      },
      error => {
        alert(error)
     
      }
    );
  }
}
