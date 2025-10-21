import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { AuthGuard } from './guard/auth.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'movies', component: MoviesComponent, canActivate: [AuthGuard] },
    { path: 'movies/:id', component: MovieDetailsComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: '**', component: NotFoundComponent },
];
