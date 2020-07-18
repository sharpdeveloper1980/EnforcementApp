import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { environment } from '../../environments/environment';
declare var $: any;
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  enforce_id: any = {};
  deploy_id: any = {};
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, public toastController: ToastController,public alertController: AlertController) { }

  ngOnInit() {
    var en = JSON.parse(localStorage.getItem('enforce'));
    if (en == null) {
      this.router.navigate(['/login']);
    } else {
      this.deploy_id = en.deployment_id;
      this.enforce_id = en.id;
    }
  }
  async presentToast(msg) {
		const toast = await this.toastController.create({
			message: msg,
			color: 'dark',
			duration: 2000,
			position: "bottom",
			cssClass: "my-custom-class", 
		});
		toast.present();
	}

  change(f){
    var old_pass=f.value.old_pass;
    var new_pass=f.value.new_pass;
    let change_data = JSON.stringify({ 'old_password': old_pass, 'new_password': new_pass, 'id': this.enforce_id});
    this.http.post(environment.base_api + 'enforceChangePassword', change_data).subscribe((res) => {
      if(res==0){
        this.presentToast("Old password does'nt match.");
      }else{
        $('#change-form').trigger('reset');
        this.presentToast("Password changed successfully.");
      }
    });
  }
}
