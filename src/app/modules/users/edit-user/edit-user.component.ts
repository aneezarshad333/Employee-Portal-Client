import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';
import { UserSchema } from '../Models/userSchema';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  user: UserSchema = {}
  constructor(private route: ActivatedRoute, private api: ApiService, private toaster: ToastrService) { }

  ngOnInit(): void {
    this.route.params.subscribe(res => {
      console.log(res)
      const { id } = res
      this.getUserDetails(id)
    })
  }

  getUserDetails(userId: string) {
    this.api.getSingleUserAPI(userId).subscribe(res => {
      this.user = res
    })
  }

  cancel(userId: any) {
    this.getUserDetails(userId)
  }

  update(userId: any) {
    this.api.updateUserAPI(userId, this.user).subscribe({
      next: res => {
        this.toaster.success('User details updated successfully')
      },
      error: reason => {
        this.toaster.error(reason.message)
      }
    })
  }
}
