import { Component, OnInit } from "@angular/core";
import { NavController, MenuController, Platform } from "@ionic/angular";
import { ToastController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { NgForm } from "@angular/forms";
import { environment } from "../../environments/environment";
@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  enforce: any = {};
  subscription: any = {};
  constructor(
    public platform: Platform,
    public navCtrl: NavController,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    public toastController: ToastController,
    public menuCtrl: MenuController
  ) {}

  ngOnInit() {
    
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
    this.subscription = this.platform.backButton.subscribeWithPriority(
      999990,
      () => {
        //navigator['app'].exitApp();
        console.log("currentpage1");
      }
    );
    console.log(this.subscription);
    if (localStorage.getItem("enforce") === null) {
      this.navCtrl.navigateRoot("/login");
    } else {
      // this.navCtrl.navigateRoot('/');
      this.navCtrl.navigateRoot("/home");
    }
  }

  ionViewWillLeave() {
    this.menuCtrl.enable(true);
    this.subscription.unsubscribe();
  }
  
  public type = "password";
  public showPass = false;
  showPassword() {
    this.showPass = !this.showPass;
    if (this.showPass) {
      this.type = "text";
    } else {
      this.type = "password";
    }
  }
  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      color: "dark",
      duration: 2000,
      position: "bottom",
      cssClass: "my-custom-class"
    });
    toast.present();
  }

  login(f) {
    var email = f.value.email;
    var password = f.value.password;
    let login_post = JSON.stringify({ email: email, password: password });
    this.http
      .post(environment.base_api + "enforceLogin", login_post)
      .subscribe(res => {
        if (res == 0) {
          this.presentToast("Invalid Credentials.");
        } else {
          this.enforce = res; // Setting up user data in userData var
          localStorage.setItem("enforce", JSON.stringify(this.enforce));
          this.router.navigate(["/home"]);
        }
      });
  }
}
