import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [

    { path: '', component: HomeComponent },
    { path: 'movies', component: MoviesComponent },
    { path: 'login', component: LoginComponent },
    { path: '**', component: NotFoundComponent },
];
