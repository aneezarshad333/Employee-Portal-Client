import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { UserSchema } from '../Models/userSchema';
import { ToastrService } from 'ngx-toastr';
import jspdf from 'jspdf'
import autoTable from 'jspdf-autotable'

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  allUsers: UserSchema[] = []
  searchKey: string = ''
  page: number = 1;

  constructor(private api: ApiService, private toaster: ToastrService) { }

  ngOnInit(): void {
    this.getAllUsers()
  }

  getAllUsers() {
    this.api.getAllUsersAPI().subscribe({
      next: (res: any) => {
        this.allUsers = res
      },
      error: (reason: any) => {
        console.log(reason.message)
      }
    })
  }
  deleteUser(id: any) {
    this.api.removeUserAPI(id).subscribe(res => {
      this.toaster.success('User Removed Successfully')
      this.getAllUsers()
    })
  }
  generatePDF() {
    let pdf = new jspdf()
    let head = [['EmpId', 'Username', 'Email', 'Status']]
    let body: any = []
    this.allUsers.forEach(item => {
      if (item.id != '1') {
        body.push([item.empId, item.name, item.email, item.status != '1' ? 'Inactive' : 'Active'])
      }
    })
    pdf.setFontSize(16)
    pdf.text("All Users List", 10, 10)
    autoTable(pdf, { head, body })
    pdf.output('dataurlnewwindow')
    pdf.save('alluserslist.pdf')
  }
  sortById() {
    this.allUsers.sort((user1: any, user2: any) => user1.empId.localeCompare(user2.empId))
  }
  sortByName() {
    this.allUsers.sort((user1: any, user2: any) => user1.name.localeCompare(user2.name))
  }

}
