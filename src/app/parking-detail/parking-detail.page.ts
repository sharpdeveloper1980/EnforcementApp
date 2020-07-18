import { Component, OnInit } from "@angular/core";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import {
  FileTransfer,
  FileUploadOptions,
  FileTransferObject
} from "@ionic-native/file-transfer/ngx";
import { File } from "@ionic-native/file";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { NavController, MenuController } from "@ionic/angular";
import { ToastController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { NgForm } from "@angular/forms";
import { LoadingController } from "@ionic/angular";
import { environment } from "../../environments/environment";
import { empty } from "rxjs";
declare var $: any;
@Component({
  selector: "app-parking-detail",
  templateUrl: "./parking-detail.page.html",
  styleUrls: ["./parking-detail.page.scss"]
})
export class ParkingDetailPage implements OnInit {
  deploy_id: any = {};
  image: any = "";
  image2: any = "";
  tickets: any = [];
  ticket_number: any = [];
  parking: any = [];
  model: any = {};
  enforce_id: any = {};
  weatherResult = false;
  loading: any;
  error: any = [];
  check_licence: any = [];
  imageURI: any = {};
  imageURIV: any = {};
  imageFileName: any = {};
  lat: any = {};
  lng: any = {};
  verify: any = {};
  v: any = {};
  constructor(
    private geolocation: Geolocation,
    private transfer: FileTransfer,
    private camera: Camera,
    public menuCtrl: MenuController,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    public toastController: ToastController,
    public loadingController: LoadingController,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    var en = JSON.parse(localStorage.getItem("enforce"));
    if (en == null) {
      this.router.navigate(["/login"]);
    } else {
      this.deploy_id = en.deployment_id;
      this.enforce_id = en.id;
    }
  }
  ionViewDidEnter() {
    this.menuCtrl.enable(false);
    this.http
      .get(environment.base_api + "defualtTickets/" + this.deploy_id)
      .subscribe(res => {
        this.tickets = res;
        console.log(this.tickets);
      });
    this.geolocation
      .getCurrentPosition({
        maximumAge: 1000,
        timeout: 5000,
        enableHighAccuracy: true
      })
      .then(
        resp => {
          // resp.coords.latitude
          // resp.coords.longitude
          //alert("r succ"+resp.coords.latitude)
          this.lat = resp.coords.latitude;
          this.lng = resp.coords.longitude;
        },
        er => {
          //alert("error getting location")
          alert("Can not retrieve Location");
        }
      )
      .catch(error => {
        //alert('Error getting location'+JSON.stringify(error));
        alert("Error getting location - " + JSON.stringify(error));
      });
    //this.loadingPresent();
    this.http
      .get(environment.base_api + "parkedDefaultCars/" + this.enforce_id)
      .subscribe(res1 => {
        this.weatherResult = true;
        this.parking = res1;
        //this.loadingDismiss();
        // if(res1==0){
        //   this.error="No parked cars found.";
        // }else{
        //   console.log(this.parking);
        // }
      });
  }
  ionViewWillLeave() {
    this.menuCtrl.enable(true);
  }
  async loadingPresent(message: string = null, duration: number = null) {
    const loading = await this.loadingController.create({
      message,
      duration,
      spinner: "lines",
      cssClass: "my-loading-class"
    });
    return await loading.present();
  }
  async loadingDismiss() {
    return this.loadingController.dismiss();
  }
  onChange($event) {
    var ticket_id = $event.target.value;
    var last_number = Date.now();
    this.http
      .get(environment.base_api + "defualtTicketNumber/" + ticket_id)
      .subscribe(res => {
        this.ticket_number = res;
        var ticket_numbers =
          this.ticket_number.ticket_starting_no +
          "-" +
          this.ticket_number.ticket_city_code +
          "-" +
          this.ticket_number.ticket_code +
          "-" +
          last_number;
        var ticket_c = this.ticket_number.ticket_cost;
        $("#ticket_numbers").val(ticket_numbers);
        $("#ticket_price").val(ticket_c);
      });
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
  ticket(f) {
    var ticket_lookup = f.value.ticket_lookup;
    var ticket_no = f.value.ticket_no;
    var licence_plate = f.value.licence_plate;
    var price = f.value.ticket_price;
    if (this.image2 == "" && this.image == "") {
      this.presentToast("Please select licence and VIN images.");
      return false;
    } else {
      let ticket_data = JSON.stringify({
        a: ticket_lookup,
        b: ticket_no,
        c: licence_plate,
        d: price,
        enforce_id: this.enforce_id,
        deploy_id: this.deploy_id,
        lat: this.lat,
        lng: this.lng
      });
      this.http
        .post(environment.base_api + "addDefaultTicket", ticket_data)
        .subscribe(res => {
          if (res == 0) {
            this.presentToast("Something went wrong.");
          } else {
            if (this.v == "no") {
              this.uploadFile();
              this.uploadVIN();
            } else {
              this.presentToast("Car parked.");
              this.router.navigate(["/home"]);
            }

            // var self = this;
            // this.http.get(environment.base_api + 'parkedDefaultCarsById/' + res).subscribe((res1) => {
            //   console.log(self.parking);
            //   if (self.parking == '') {
            //     self.parking = res1;
            //     console.log(self.parking);
            //     $("#parking_form").trigger("reset");
            //     //$(".invalid-form").css("display", "none");
            //   } else {
            //     $("#parking_form").trigger("reset");
            //     //$(".invalid-form").css("display", "none");
            //     this.parking.push(res1[0]);
            //   }
            // });
          }
        });
    }
  }
  onKeydown(e) {
    //if (navigator.userAgent.match(/Android/i)) {
    var self = this;
    setTimeout(function() {
      var inputValue = e.target.value;

      var charKeyCode = e.keyCode || e.which;

      if (charKeyCode == 0 || charKeyCode == 229) {
        charKeyCode = self.getKeyCode(inputValue);
        //alert(charKeyCode+' keyy Pressed');
        if (charKeyCode === 32) {
          var replace = inputValue.split(" ").join("");
          $("#licence").val(replace);
          //alert(replace);
        }
      } else {
        //alert(charKeyCode+' key Pressed');
        if (charKeyCode === 32) {
          var replace = inputValue.split(" ").join("");
          $("#licence").val(replace);
          // alert(replace);
          // e.preventDefault();
          // return false;
        }
        // return true;
      }
    }, 0);
    //}
  }
  async confirmAlert(id) {
    const alert = await this.alertController.create({
      header: "Confirm!",
      message: "Are you sure, you want to leave?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: blah => {
            console.log("Confirm Cancel: blah");
          }
        },
        {
          text: "Okay",
          handler: () => {
            this.http
              .get(environment.base_api + "leaveCars/" + id)
              .subscribe(res => {
                if (res == 1) {
                  this.presentToast("Car leaved.");
                  this.router.navigate(["/home"]);
                }
              });
            console.log("Confirm Okay");
          }
        }
      ]
    });

    await alert.present();
  }
  leave(id) {
    this.confirmAlert(id);
  }

  openCam() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      //sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then(
      imageData => {
        this.imageURI = imageData;
        this.image2 = (<any>window).Ionic.WebView.convertFileSrc(imageData);
      },
      err => {
        console.log(err);
        this.presentToast(err);
      }
    );
  }
  uploadFile() {
    var licence = $("#licence").val();
    this.loadingPresent();
    const fileTransfer: FileTransferObject = this.transfer.create();

    let options: FileUploadOptions = {
      fileKey: "fileKey",
      fileName: Date.now() + ".jpg",
      chunkedMode: false,
      mimeType: "image/jpeg",
      headers: {}
    };

    fileTransfer
      .upload(
        this.imageURI,
        encodeURI(environment.base_api + "uploadLicenceImage/" + licence),
        options
      )
      .then(
        data => {
          console.log(data + " Uploaded Successfully");
          this.imageFileName = "";
          this.loadingDismiss();
          //this.presentToast("Licence image uploaded successfully");
        },
        err => {
          console.log(err);
          this.loadingDismiss();
          this.presentToast(JSON.stringify(err));
        }
      );
  }

  openCamVIN() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      //sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then(
      imageData => {
        this.imageURIV = imageData;
        this.image = (<any>window).Ionic.WebView.convertFileSrc(imageData);
      },
      err => {
        console.log(err);
        this.presentToast(err);
      }
    );
  }
  uploadVIN() {
    var licence = $("#licence").val();
    this.loadingPresent();
    const fileTransfer: FileTransferObject = this.transfer.create();

    let options: FileUploadOptions = {
      fileKey: "fileKey",
      fileName: Date.now() + ".jpg",
      chunkedMode: false,
      mimeType: "image/jpeg",
      headers: {}
    };

    fileTransfer
      .upload(
        this.imageURIV,
        encodeURI(environment.base_api + "uploadVINImage/" + licence),
        options
      )
      .then(
        data => {
          console.log(data + " Uploaded Successfully");

          this.imageFileName = "";
          this.loadingDismiss();
          //this.presentToast("VIN image uploaded successfully");
          this.presentToast("Car parked.");
          this.router.navigate(["/home"]);
        },
        err => {
          console.log(err);
          this.loadingDismiss();
          this.presentToast(JSON.stringify(err));
        }
      );
  }
  getKeyCode(str) {
    return str.charCodeAt(str.length - 1);
  }
  onKeyPressed(e) {
    var inputValue = e.target.value;
    alert(inputValue);
    var charKeyCode = e.keyCode || e.which;
    if (charKeyCode == 0 || charKeyCode == 229) {
      charKeyCode = this.getKeyCode(inputValue);
      alert(charKeyCode + " key pPressed");
    } else {
      alert(charKeyCode + " key Pressed");
    }
    if (charKeyCode == 32) {
      return false;
    }
    var self = this;
    setTimeout(function() {
      inputValue = e.target.value;
      self.http
        .get(environment.base_api + "verifyLicence/" + inputValue)
        .subscribe(res => {
          self.check_licence = res;
          if (res == 1) {
            $(".verify-div").css("display", "block");
          } else {
            $(".not-verify-div").css("display", "block");
            $(".click-pic").css("display", "block");
          }
        });
    }, 0);

    // if (event.keyCode === 32 ) {
    //   return false;
    // }
    // setTimeout(() =>
    // dInput= event.target.value;
    // console.log(event.target.value), 0);
    // var self = this;
    // setTimeout(function () {
    //   dInput = event.target.value;
    //   alert(dInput);
    //   self.http.get(environment.base_api + 'verifyLicence/' + dInput).subscribe((res) => {
    //     self.check_licence = res;
    //     if (res == 1) {
    //       $(".verify-div").css("display", "block");
    //     } else {
    //       $(".not-verify-div").css("display", "block");
    //       $(".click-pic").css("display", "block");
    //     }
    //   });
    // }, 0);
    // var k = event.keyCode;
    // alert(k);
    // if (k == 32) {
    //   event.preventDefault();
    // }
  }

  async licenceCheck(msg) {
    const alert = await this.alertController.create({
      header: "Confirm!",
      message: "You want to verify licence ?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: blah => {
            console.log("Confirm Cancel: blah");
            this.verify = "";
            var licence = $("#licence").val("");
            $(".verify-btn").css("display", "block");
            $(".not-verify-div").css("display", "none");
          }
        },
        {
          text: "Okay",
          handler: () => {
            this.http
              .get(environment.base_api + "insertLicencePlate/" + msg)
              .subscribe(res => {
                if (res != 0) {
                  $(".not-verify-div").css("display", "none");
                  $(".click-pic").css("display", "block");
                }
              });

            console.log("Confirm Okay");
          }
        }
      ]
    });

    await alert.present();
  }

  verifyLicence() {
    if ($("#licence").val() == "") {
      this.presentToast("Please enter licence.");
      return false;
    }
    this.loadingPresent();
    var licence = $("#licence").val();
    this.http
      .get(environment.base_api + "verifyLicence/" + licence)
      .subscribe(res => {
        this.check_licence = res;
        this.verify = "display";
        this.loadingDismiss();
        $(".verify-btn").css("display", "none");
        if (res == 1) {
          this.v = "yes";
          this.image = 'yes';
          this.image2 = 'yes';
          $(".verify-div").css("display", "block");
        } else {
          this.v = "no";
          $(".not-verify-div").css("display", "block");
          var self = this;
          setTimeout(function() {
            self.licenceCheck(licence);
          }, 1000);

          //$(".click-pic").css("display", "block");
        }
      });
  }
}
