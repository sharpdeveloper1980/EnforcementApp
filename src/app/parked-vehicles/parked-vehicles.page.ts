import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-parked-vehicles',
  templateUrl: './parked-vehicles.page.html',
  styleUrls: ['./parked-vehicles.page.scss'],
})
export class ParkedVehiclesPage implements OnInit {
  deploy_id: any = {};
  parking: any = [];
  error: any = [];
  enforce_id: any = {};
  weatherResult = false;
  loading: any;
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, public toastController: ToastController,public loadingController: LoadingController,public alertController: AlertController) { }

  ngOnInit() {
    var en = JSON.parse(localStorage.getItem('enforce'));
    if (en == null) {
      this.router.navigate(['/login']);
    } else {
      this.deploy_id = en.deployment_id;
      this.enforce_id = en.id;
    }
  }
  ionViewDidEnter() {
    var en = JSON.parse(localStorage.getItem('enforce'));
    if (en == null) {
      this.router.navigate(['/login']);
    }else{
    this.loadingPresent();
    this.http.get(environment.base_api + 'parkedCars/' + this.enforce_id).subscribe((res) => {
      this.weatherResult = true;
      this.parking = res;
      this.loadingDismiss();
      if(res==0){
        this.error="No parked cars found.";
      }else{
        console.log(this.parking);
      }
      
    });
    }
  }
  async loadingPresent(message: string = null, duration: number = null) {
    const loading = await this.loadingController.create({ message, duration, spinner: 'lines',cssClass: 'my-loading-class' });
    return await loading.present();
}
  async loadingDismiss() {
    return this.loadingController.dismiss();
}
async confirmAlert(id) {
  const alert = await this.alertController.create({
    header: 'Confirm!',
    message: 'Are you sure, you want to leave?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Okay',
        handler: () => {
          this.http.get(environment.base_api + 'leaveCars/' + id).subscribe((res) => {
            if(res==1){
              this.presentToast('Car leaved.');
              this.router.navigate(['/home']);
            }
          });
          console.log('Confirm Okay');
        }
      }
    ]
  });

  await alert.present();
}
  leave(id){
    this.confirmAlert(id);
    
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
}
