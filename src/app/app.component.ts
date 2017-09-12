import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Http } from "@angular/http";
import { GlobalServices } from "../services/globalservices";
import { Events } from 'ionic-angular';

/* import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list'; */
import { SignInPage } from '../pages/signin/signin';
import { SignUpPage } from '../pages/signup/signup';
import { ForgotPassPage } from '../pages/forgotp/forgotp';
import { ResetPassPage } from '../pages/resetp/resetp';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { AppointmentContactPage } from '../pages/appointment/contacts/contacts';
import { AppointmentPendingListPage } from '../pages/appointment/pending-list/pending-list';
import { AppointmentSentListPage } from '../pages/appointment/sent-list/sent-list';


@Component({
  templateUrl: 'app.html',
  providers: [GlobalServices]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = SignInPage;
  loggedInUser: any;

  keyWisePages: any;
  multiLevelKey: any;

  constructor(public platform: Platform, public statusBar: StatusBar,
    public splashScreen: SplashScreen, private http: Http, private gb: GlobalServices,
    public events: Events) {
    this.initializeApp();   

    this.keyWisePages = new Array();
    this.keyWisePages["signin"] = SignInPage;
    this.keyWisePages["signup"] = SignUpPage;
    this.keyWisePages["home"] = DashboardPage;
    this.keyWisePages["forgotp"] = ForgotPassPage;
    this.keyWisePages["resetp"] = ResetPassPage;
    this.keyWisePages["schedule"] = AppointmentContactPage;
    this.keyWisePages["pendingrequest"] = AppointmentPendingListPage;
    this.keyWisePages["sentrequest"] = AppointmentSentListPage ;    

    this.multiLevelKey = new Array();
    this.multiLevelKey["profile"] = false;
    this.multiLevelKey["appointment"] = false;

    events.subscribe('user:login', () => {
      this.loggedInUser = localStorage.getItem('currentUser');
      if (this.loggedInUser) {
        this.nav.setRoot(DashboardPage);
        //this.nav.setRoot(AppointmentContactPage); //Testing Purpose
      } else {
        this.nav.setRoot(SignInPage);
      }
    });

    this.loggedInUser = localStorage.getItem('currentUser');
  }

  ngOnInit() {
    if (this.loggedInUser) {
      this.nav.setRoot(DashboardPage);
    } else {
      this.http.post(this.gb.checkSessionUrl, {}).map(res => res.json())
        .subscribe(r => {
          this.gb.presentToast(r.message);
          console.log(r.user);
          if (r.IsSuccess) {
            this.gb.setUserInstance(JSON.stringify(r.user));
            this.nav.setRoot(DashboardPage);
          } else {
            this.gb.setUserInstance('');
            this.nav.setRoot(SignInPage);
          }
        })
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  /* openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  } */

  openPage(pageKey) {
    this.nav.setRoot(this.keyWisePages[pageKey]);
  }

  manageLevel(menuKey){
    var currVal = this.multiLevelKey[menuKey];
    for(var i in this.multiLevelKey){
      this.multiLevelKey[i] = false;
    }
    this.multiLevelKey[menuKey] = !currVal;
  }

  signOut() {
    this.http.post(this.gb.signOutUrl, {}).map(res => res.json())
      .subscribe(r => {
        this.gb.presentToast(r.message);
        if (r.IsSuccess) {
          this.gb.setUserInstance('');
          this.events.publish('user:login');
          //this.nav.setRoot(SignInPage);
        }
      })
  }
}
