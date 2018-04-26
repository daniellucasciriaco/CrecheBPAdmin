/* Angular */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

/* Library */
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireAuth } from 'angularfire2/auth';
import { environment } from '../environments/environment';

/* Modules */
import { AppRoutingModule } from './app-routing.module';

/* Components */
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { NewsComponent } from './news/news.component';
import { EventsComponent } from './events/events.component';
import { AddNewsComponent } from './add-news/add-news.component';
import { AddEventComponent } from './add-event/add-event.component';
import { WorkWithUsComponent } from './work-with-us/work-with-us.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { CollaboratorsComponent } from './collaborators/collaborators.component';
import { AddCollaboratorComponent } from './add-collaborator/add-collaborator.component';
import { LoadingComponent } from './loading/loading.component';

/* Services */
import { AuthService } from './services/auth.service';
import { NewsService } from './services/news.service';
import { EventService } from './services/event.service';
import { WorkWithUsService } from './services/work-with-us.service';
import { FeedbackService } from './services/feedback.service';
import { CollaboratorService } from './services/collaborator.service';
import { UploadService } from './services/upload.service';

/* Guards */
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    LoginComponent,
    MainComponent,
    NewsComponent,
    EventsComponent,
    AddNewsComponent,
    AddEventComponent,
    WorkWithUsComponent,
    FeedbackComponent,
    CollaboratorsComponent,
    AddCollaboratorComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AppRoutingModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    NewsService,
    EventService,
    FeedbackService,
    CollaboratorService,
    WorkWithUsService,
    UploadService,
    AngularFireAuth
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
