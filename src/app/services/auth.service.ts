import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, User } from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable();
  private useDevAuth: boolean = environment.firebase.apiKey === 'your-api-key';

  constructor(private auth: Auth) {
    if (this.useDevAuth) {
      const saved = localStorage.getItem('devUser');
      if (saved) {
        this.userSubject.next(JSON.parse(saved) as User);
      }
    } else {
      //Firebase
      this.auth.onAuthStateChanged((user) => {
        this.userSubject.next(user);
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
        } else {
          localStorage.removeItem('user');
        }
      });
    }
  }

  // вход email и пароль
  async signInWithEmail(email: string, password: string): Promise<any> {
    if (this.useDevAuth) {
      const mockUser: any = { uid: 'dev-' + Math.random().toString(36).slice(2), email };
      this.userSubject.next(mockUser as User);
      localStorage.setItem('devUser', JSON.stringify(mockUser));
      return { user: mockUser };
    }
    const result = await signInWithEmailAndPassword(this.auth, email, password);
    return result;
  }

  // регистрация
  async signUpWithEmail(email: string, password: string): Promise<any> {
    if (this.useDevAuth) {
      return this.signInWithEmail(email, password);
    }
    const result = await createUserWithEmailAndPassword(this.auth, email, password);
    return result;
  }

  // вход через google
  async signInWithGoogle(): Promise<any> {
    if (this.useDevAuth) {
      const mockUser: any = { uid: 'dev-google', email: 'user@example.com', displayName: 'Dev User' };
      this.userSubject.next(mockUser as User);
      localStorage.setItem('devUser', JSON.stringify(mockUser));
      return { user: mockUser };
    }
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(this.auth, provider);
    return result;
  }

  // выход
  async signOut(): Promise<void> {
    if (this.useDevAuth) {
      localStorage.removeItem('devUser');
      this.userSubject.next(null);
      return;
    }
    await signOut(this.auth);
  }

  // получить текущего пользователя
  getCurrentUser(): User | null {
    return this.userSubject.getValue();
  }

  // проверка авторизации
  isAuthenticated(): boolean {
    return this.userSubject.getValue() !== null;
  }

  // получение токена пользователя
  async getToken(): Promise<string | null> {
    const user: any = this.userSubject.getValue();
    if (user) {
      if (this.useDevAuth) {
        return 'dev-token';
      }
      return await user.getIdToken();
    }
    return null;
  }
}

