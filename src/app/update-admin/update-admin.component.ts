import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-admin',
  templateUrl: './update-admin.component.html',
  styleUrls: ['./update-admin.component.css']
})
export class UpdateAdminComponent implements OnInit {

  @Output() onAdminChange = new EventEmitter()
  profile_pic: string = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRearvFLc1I844xP6gT_IZb2le9JTkmaJxWD8lDEOZ3SQ&s'
  editAdminStatus: boolean = false

  adminDetails: any = {

  }

  constructor(private api: AdminService, private toaster: ToastrService) { }

  ngOnInit(): void {
    this.api.getAdminDetails().subscribe((res: any) => {
      this.adminDetails = res
      if (res.profile_pic) {
        this.profile_pic = res.profile_pic
      }
    })
  }

  editAdminBtn() {
    this.editAdminStatus = true
  }
  onCancel() {
    this.editAdminStatus = false
  }
  getFile(event: any) {
    let file = event.target.files[0]
    let fr = new FileReader()
    fr.readAsDataURL(file)
    fr.onload = (event: any) => {
      this.profile_pic = event.currentTarget.result
      this.adminDetails.profile_pic = this.profile_pic
    }
  }
  updateAdmin() {
    this.api.updateAdminDetails(this.adminDetails).subscribe({
      next: (res: any) => {
        this.toaster.success('Admin Details Updated!')
        sessionStorage.setItem("adminDetails", JSON.stringify(res))
        this.editAdminStatus = false
        this.onAdminChange.emit(res.name)
      },
      error: (reason: any) => {
        this.toaster.error(reason.message)
      }
    })
  }
}
