import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ApiService } from '../modules/users/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  sidebarStatus: boolean = true
  empCount: number = 0
  adminName: string = ''

  constructor(private router: Router, private toaster: ToastrService, private api: ApiService) { }

  ngOnInit(): void {
    this.getTotalEmpCount()
    if (sessionStorage.getItem("adminDetails")) {
      this.adminName = JSON.parse(sessionStorage.getItem("adminDetails") || "").name
    }
  }

  menuBtnClicked() {
    this.sidebarStatus = !this.sidebarStatus
  }

  logout() {
    sessionStorage.clear()
    this.router.navigateByUrl('/')
    this.toaster.success('Logged Out Successfully')
  }

  getTotalEmpCount() {
    this.api.getAllUsersAPI().subscribe((res: any) => {
      this.empCount = res.length
    })
  }

  onAdminChange(event: any) {
    this.adminName = event
  }
}
