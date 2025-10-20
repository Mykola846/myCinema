import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MovieService, Movie } from '../../services/movie.service';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];
  isLoading: boolean = true;
  query: string = '';

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.fetchMovies();
  }

  fetchMovies() {
    this.isLoading = true;
    this.movieService.getMovies().subscribe(movies => {
      this.movies = movies;
      this.isLoading = false;
    });
  }

  onSearchChange(value: string) {
    this.query = value;
    if (!value) {
      this.fetchMovies();
      return;
    }
    this.movieService.searchMovies(value).subscribe(movies => {
      this.movies = movies;
    });
  }
}
