import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { NgCalendarModule  } from 'ionic2-calendar';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { SignInPage } from '../pages/signin/signin';
import { SignUpPage } from '../pages/signup/signup';
import { ForgotPassPage } from '../pages/forgotp/forgotp';
import { ResetPassPage } from '../pages/resetp/resetp';
import { DashboardPage } from '../pages/dashboard/dashboard';

import { AppointmentRequestPage } from '../pages/appointment/request/request';
import { AppointmentSchedulePage } from '../pages/appointment/schedule/schedule';
import { AppointmentContactPage } from '../pages/appointment/contacts/contacts';
import { AppointmentPendingListPage } from '../pages/appointment/pending-list/pending-list';
import { AppointmentPendingDetailPage } from '../pages/appointment/pending-details/pending-details';
import { AppointmentSentListPage } from '../pages/appointment/sent-list/sent-list';
import { AppointmentSentDetailPage } from '../pages/appointment/sent-details/sent-details';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    SignInPage,
    SignUpPage,
    ForgotPassPage,
    ResetPassPage,
    DashboardPage,
    AppointmentRequestPage,
    AppointmentSchedulePage,
    AppointmentContactPage,
    AppointmentPendingListPage,
    AppointmentPendingDetailPage,
    AppointmentSentListPage,
    AppointmentSentDetailPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NgCalendarModule,
    IonicModule.forRoot(MyApp),
    BsDropdownModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    SignInPage,
    SignUpPage,
    ForgotPassPage,
    ResetPassPage,
    DashboardPage,
    AppointmentRequestPage,
    AppointmentSchedulePage,
    AppointmentContactPage,
    AppointmentPendingListPage,
    AppointmentPendingDetailPage,
    AppointmentSentListPage,
    AppointmentSentDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
