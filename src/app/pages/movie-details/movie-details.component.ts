import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService, Movie } from '../../services/movie.service';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  movie: Movie | undefined;
  isLoading: boolean = true;
  movieId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.movieId = +params['id'];
      if (this.movieId) {
        this.loadMovieDetails();
      }
    });
  }

  loadMovieDetails() {
    if (this.movieId) {
      this.movieService.getMovieById(this.movieId).subscribe({
        next: (movie) => {
          this.movie = movie;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Ошибка загрузки фильма:', error);
          this.isLoading = false;
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['/movies']);
  }

  formatDuration(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}ч ${mins}м` : `${mins}м`;
  }
}
