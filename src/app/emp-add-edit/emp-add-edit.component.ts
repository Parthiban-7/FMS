import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss']
})
export class EmpAddEditComponent {
  fmsForm: FormGroup;
  
  constructor(
    private _fb:FormBuilder,
    private _empservice:EmployeeService,
    private _dialogRef: MatDialogRef<EmpAddEditComponent>)
  {
    this.fmsForm =this._fb.group({
      FirstName:'',
      LastName:'',
      gender:'',
      email : '',
      dob : '',
      doj : '',
      designation : '',
      qualification : ''
    })
  }
  onFormSubmit(){
    if(this.fmsForm.valid)
    {
      console.log(this.fmsForm.value)
      this._empservice.addEmployee(this.fmsForm.value).subscribe({
        next: (val: any) => {
              alert('submitted')
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
      }})
    }
  }
  

}
