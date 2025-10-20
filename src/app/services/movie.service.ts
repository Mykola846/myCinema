import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Movie {
  id: number;
  title: string;
  year: number;
  genre: string[];
  rating: number;
  description: string;
  poster: string;
  director: string;
  cast: string[];
  duration: number; 
  awards?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private movies: Movie[] = [
    {
      id: 1,
      title: "Интерстеллар",
      year: 2014,
      genre: ["Фантастика", "Драма", "Приключения"],
      rating: 8.6,
      description: "Когда засуха, пыльные бури и вымирание угрожают человечеству, группа астронавтов отправляется через червоточину в космосе, чтобы найти новый дом для человечества.",
      poster: "https://lafeum.ru/img/authors/1607593784.jpeg",
      director: "Кристофер Нолан",
      cast: ["Мэттью Макконахи", "Энн Хэтэуэй", "Джессика Честейн", "Майкл Кейн"],
      duration: 169,
      awards: ["Оскар за лучшие визуальные эффекты", "Оскар за лучший звук"]
    },
    {
      id: 2,
      title: "Бегущий по лезвию 2049",
      year: 2017,
      genre: ["Фантастика", "Триллер", "Драма"],
      rating: 8.0,
      description: "Молодой офицер полиции раскрывает секрет, который может погрузить общество в хаос. Его поиски приводят к бывшему офицеру полиции Лос-Анджелеса.",
      poster: "https://play-lh.googleusercontent.com/Hy4VMlYY6PoUV0xypnLUgu2VaZBvWa81Le6xDeHbY7YD-6mZAM1EB1QD4rmIDpLMpARsmQ",
      director: "Дени Вильнёв",
      cast: ["Райан Гослинг", "Харрисон Форд", "Ана де Армас", "Сильвия Хукс"],
      duration: 164,
      awards: ["Оскар за лучшую кинематографию", "Оскар за лучшие визуальные эффекты"]
    },
    {
      id: 3,
      title: "Дюна",
      year: 2021,
      genre: ["Фантастика", "Драма", "Приключения"],
      rating: 8.0,
      description: "Пол Атрейдес, талантливый и способный молодой человек, рождённый с великой судьбой, которую он не может понять, должен отправиться на самую опасную планету во вселенной.",
      poster: "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
      director: "Дени Вильнёв",
      cast: ["Тимоти Шаламе", "Ребекка Фергюсон", "Оскар Айзек", "Джош Бролин"],
      duration: 155,
      awards: ["Оскар за лучшую кинематографию", "Оскар за лучшие визуальные эффекты", "Оскар за лучший звук"]
    },
    {
      id: 4,
      title: "Топ Ган: Мэверик",
      year: 2022,
      genre: ["Экшн", "Драма"],
      rating: 8.3,
      description: "После тридцати лет службы в качестве одного из лучших пилотов ВМС, Пит 'Мэверик' Митчелл находится там, где он принадлежит, толкая границы как смелый летчик-испытатель.",
      poster: "https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg",
      director: "Джозеф Косински",
      cast: ["Том Круз", "Майлз Теллер", "Дженнифер Коннелли", "Джон Хэмм"],
      duration: 131,
      awards: ["Оскар за лучший звук"]
    },
    {
      id: 5,
      title: "Аватар: Путь воды",
      year: 2022,
      genre: ["Фантастика", "Экшн", "Приключения"],
      rating: 7.8,
      description: "Сет через более чем десятилетие после событий первого фильма, Аватар: Путь воды начинает рассказ о семье Джейка, о том, что он делает, о проблемах, которые его преследуют.",
      poster: "https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
      director: "Джеймс Кэмерон",
      cast: ["Сэм Уортингтон", "Зои Салдана", "Сигурни Уивер", "Стивен Лэнг"],
      duration: 192,
      awards: ["Оскар за лучшие визуальные эффекты"]
    },
    {
      id: 6,
      title: "Фантастическая четверка: Первые шаги",
      year: 2025,
      genre: ["Екшн", "Наукова", "Фантастика"],
      rating: 5.7,
      description: "это команда супергероев из комиксов Marvel, которая состоит из четырёх астронавтов, получивших суперсилы после облучения космическими лучами. Команда стала первой в истории Marvel, появившейся в 1961 году. ",
      poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0JHZuOxFx0Wej-EI-7Uf9bDHpDQxTZyLxHg&s",
      director: "Мэтт Шекман",
      cast: ["Педро Паскаль", "Ванесса Кирби", "Джозеф Куинн", "Эбон Мосс-Бакрак", "Джулия Гарнер", "Ральф Айнесон"],
      duration: 115,
      awards: ["EMA Gold Seal"]
    }
  ];

  constructor() { }

  // Получить все фильмы
  getMovies(): Observable<Movie[]> {
    return of(this.movies);
  }

  // Получить фильм по ID
  getMovieById(id: number): Observable<Movie | undefined> {
    const movie = this.movies.find(m => m.id === id);
    return of(movie);
  }

  // Поиск фильмов по названию
  searchMovies(query: string): Observable<Movie[]> {
    const filteredMovies = this.movies.filter(movie => 
      movie.title.toLowerCase().includes(query.toLowerCase()) ||
      movie.director.toLowerCase().includes(query.toLowerCase()) ||
      movie.genre.some(g => g.toLowerCase().includes(query.toLowerCase()))
    );
    return of(filteredMovies);
  }

  // Получить фильмы по жанру
  getMoviesByGenre(genre: string): Observable<Movie[]> {
    const filteredMovies = this.movies.filter(movie => 
      movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
    );
    return of(filteredMovies);
  }

  // Получить топ фильмы по рейтингу
  getTopRatedMovies(limit: number = 5): Observable<Movie[]> {
    const topMovies = [...this.movies]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);
    return of(topMovies);
  }
}

