import { Component, OnInit,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { EmployeeService } from './services/employee.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'fms';
  displayedColumns: string[] = [
    'id',
    'FirstName',
    'LastName',
    'designation',
    'dob',
    'doj',
    'email',
    'gender',
    'qualification',
    'action'];
   dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort

  constructor(private _dialog: MatDialog,private _empService:EmployeeService) {}

  ngOnInit(): void{
    this.getEmployee();
  }

   openAddEditFmsForm()
   {
    const dialogRef = this._dialog.open(EmpAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployee();
        }
      },
    });
   }
   getEmployee(){
    this._empService.getEmployee().subscribe({
      next:(res)=>{
        this.dataSource=new MatTableDataSource(res);
        this.dataSource.sort=this.sort
        this.dataSource.paginator=this.paginator
      },
      error: (err)=> {
        console.error(err);}
      
    })
   }
   deleteEmployee(id :number){
    this._empService.deleteEmployee(id).subscribe({
      next: (res)=>{
        alert('deleteed')
        this.getEmployee()
      },
      error:(err)=>{
        console.log(err)
      }
    })
   }
   applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  } 
}
