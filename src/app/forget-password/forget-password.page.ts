import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { NgForm } from '@angular/forms';
import { environment } from '../../environments/environment';
declare var $: any;
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.page.html',
  styleUrls: ['./forget-password.page.scss'],
})
export class ForgetPasswordPage implements OnInit {

  constructor(public menuCtrl: MenuController,private http: HttpClient, private route: ActivatedRoute, private router: Router, public toastController: ToastController) { }

  ngOnInit() {
  }
  ionViewDidEnter() {
		this.menuCtrl.enable(false);
	}
	ionViewWillLeave() {

		this.menuCtrl.enable(true);
	}
  async presentToast(msg) {
		const toast = await this.toastController.create({
			message: msg,
			//color: 'dark',
			duration: 3000,
			position: "bottom",
			cssClass: "my-custom-class", 
		});
		toast.present();
	}
  forget(f){
    var email = f.value.email;
    let forget_data = JSON.stringify({ 'email': email});
    this.http.post(environment.base_api + 'enforceForgetPassword', forget_data).subscribe((res) => {
      if(res==0){
        this.presentToast("Your email is not registered with us.");
      }else{
        $("#forget-password").trigger("reset");
        this.presentToast("A password reset has been requested for this email account.");
        this.router.navigate(['/login']);
      }
    });
    
  }
}
