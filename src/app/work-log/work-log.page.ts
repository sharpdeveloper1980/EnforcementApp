import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-work-log',
  templateUrl: './work-log.page.html',
  styleUrls: ['./work-log.page.scss'],
})
export class WorkLogPage implements OnInit {
  deploy_id: any = {};
  enforce_id: any = {};
  lunch_time : any = {};
  time1: any = {};
  time2: any = {};
  start_actual_time: any = {};
  formatted: any = [];
  total_min: any = [];
  per_day_ticket: any = [];
  total_ticket: any = [];
  weatherResult = false;
  loading: any;
  today: any;
  constructor(public menuCtrl: MenuController,private http: HttpClient, private route: ActivatedRoute, private router: Router,public loadingController: LoadingController) { }

  ngOnInit() {
    var en = JSON.parse(localStorage.getItem('enforce'));
    if (en == null) {
      this.router.navigate(['/login']);
    } else {
      this.deploy_id = en.deployment_id;
      this.enforce_id = en.id;
    }
    this.today = Date.now();
  }
  ionViewDidEnter() {
    this.menuCtrl.enable(false); 
    this.loadingPresent();
    this.http.get(environment.base_api + 'checkLoginTime/' + this.enforce_id).subscribe((res) => {
      if(res!=0){
      var d = new Date();
      var o = {year:'numeric', month:'2-digit', day:'2-digit', hour:'2-digit', minute:'2-digit'};
      var time = d.toLocaleDateString('en-US', o);
      this.start_actual_time  =  res;
      var end_actual_time    =  time;
      this.time1 = new Date(this.start_actual_time);
      this.time2 = new Date(end_actual_time);
      var diff = this.time2 - this.time1;
      var diffSeconds = diff/1000;
      var HH = Math.floor(diffSeconds/3600);
      var MM = Math.floor(diffSeconds%3600)/60;
      this.total_min = (HH*60)+MM;
      this.weatherResult = true;
      this.formatted = ((HH < 10)?("0" + HH):HH) + ":" + ((MM < 10)?("0" + MM):MM);
      this.loadingDismiss();
      }
    });
    this.http.get(environment.base_api + 'countTicketByDate/' + this.enforce_id).subscribe((tic) => {
      this.per_day_ticket = tic;
    });
    this.http.get(environment.base_api + 'countTicket/' + this.enforce_id).subscribe((tot) => {
      this.total_ticket = tot;
    });
    this.http.get(environment.base_api + 'checkLunchTime/' + this.enforce_id).subscribe((lunch) => {
      this.lunch_time = lunch;
    });
  }
  async loadingPresent(message: string = null, duration: number = null) {
    const loading = await this.loadingController.create({ message, duration, spinner: 'lines',cssClass: 'my-loading-class' });
    return await loading.present();
}
  async loadingDismiss() {
    return this.loadingController.dismiss();
}
    ionViewWillLeave() {
    
    this.menuCtrl.enable(true);
  }
}
