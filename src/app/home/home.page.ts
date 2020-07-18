import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { empty } from 'rxjs';
@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"]
})
export class HomePage implements OnInit {
  enforce_id: any = {};
  constructor(
    public navCtrl: NavController,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    var en = JSON.parse(localStorage.getItem("enforce"));
    if (en == null) {
      this.navCtrl.navigateBack("/login");
    } else {
      this.enforce_id = en.id;
    }
  }
  ionViewWillEnter() {
    
  }
  
  async presentAlert(msg) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }
  async presentAlertRadio() {
    const alert = await this.alertController.create({
      header: "Logout",
      
      inputs: [
        {
          name: "break",
          type: "radio",
          label: "Break",
          value: "2",
          checked: true
        },
        {
          name: "lunch",
          type: "radio",
          label: "Lunch",
          value: "3"
        },
        {
          name: "note",
          type: "radio",
          label: "Note",
          value: "4"
        },
        {
          name: "logout",
          type: "radio",
          label: "End of day",
          value: "5"
        }
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            console.log("Confirm Cancel");
          }
        },
        {
          text: "Ok",
          handler: (data:string) => {
            console.log(data);
            this.http
            .get(environment.base_api + "logoutEnforce/" + this.enforce_id+"/"+data)
            .subscribe(res => {
              console.log(res['status']);
              var id =res['auto_id'];
              console.log(id);
              if (res != 0) {
                //localStorage.removeItem("enforce");
                //this.router.navigate(["/login"]);
               if(res['status']==2){
                 if(res['check']=='taken'){
                  this.presentAlert('You already taken 2 breaks in a day.');
                 }else{
                this.presentAlert('Break time start.');
                this.router.navigate(["/resume-work",id]); 
                 }
               }if(res['status'] == 3){
                 this.presentAlert('Lunch time . Worked time stopped.');
                 this.router.navigate(["/resume-work" ,id]);
               }if(res['status'] == 4){
                 this.noteAlert(id);
               }if(res['status'] == 5){
                 localStorage.removeItem("enforce");
                 this.router.navigate(["/login"]);
               }
                
              }
            });
          }
        }
      ]
    });

    await alert.present();
  }
  async noteAlert(id) {
    const alert = await this.alertController.create({
      header: 'Note',
      inputs: [
        {
          name: 'note_text',
          type: 'textarea',
          id:'note',
          placeholder: 'Enter note',
          label:'Note'
        },
        
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: data => {
            console.log(data.note_text);
           if(data.note_text==''){
            return false;
           }else{
             var text = data.note_text;
             let text_data = JSON.stringify({ text: text, enforce_id: this.enforce_id , id:id });
            this.http
            .post(environment.base_api + "insertNote/" , text_data)
            .subscribe(res => {
              if(res==1){
                this.presentAlert('Note added succesfully.');
              }
            });
            return true;
           }
           
          }
        }
      ]
    });

    await alert.present();
  }
  logout() {
    this.presentAlertRadio();
  }
}
