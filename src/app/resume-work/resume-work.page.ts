import { Component, OnInit } from "@angular/core";
import { NavController, MenuController } from "@ionic/angular";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { environment } from '../../environments/environment';
@Component({
  selector: "app-resume-work",
  templateUrl: "./resume-work.page.html",
  styleUrls: ["./resume-work.page.scss"]
})

export class ResumeWorkPage implements OnInit {
  auto_id: any = {};
  constructor(
    public menuCtrl: MenuController,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.auto_id = this.route.snapshot.params["id"];
    
  }
  ionViewDidEnter() {
    this.menuCtrl.enable(false);
    document.addEventListener("backbutton",function(e) {
      console.log("disable back button")
    }, false); 
    this.http.get(environment.base_api + 'resumeTimeById/' + this.auto_id).subscribe((res) => {
      if(res==2){
        var self = this;
      setTimeout(function(){ 
      alert("Break time over.");
      self.resumeWork(); 
    }, 900000);
      }
    });
    
    
  }
  ionViewWillLeave() {
    this.menuCtrl.enable(true);
  }
  
  resumeWork(){
    //alert(this.auto_id);
    this.http.get(environment.base_api + 'resumeTime/' + this.auto_id).subscribe((res) => {
      if(res==1){
        this.router.navigate(['/home']);
      }
      
    });
  }
}
