import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, User } from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable();

  constructor(private auth: Auth) {
    // Слушаем изменения состояния авторизации
    this.auth.onAuthStateChanged((user) => {
      this.userSubject.next(user);
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user');
      }
    });
  }

  // Вход через email и пароль
  async signInWithEmail(email: string, password: string): Promise<any> {
    try {
      const result = await signInWithEmailAndPassword(this.auth, email, password);
      return result;
    } catch (error) {
      throw error;
    }
  }

  // Регистрация через email и пароль
  async signUpWithEmail(email: string, password: string): Promise<any> {
    try {
      const result = await createUserWithEmailAndPassword(this.auth, email, password);
      return result;
    } catch (error) {
      throw error;
    }
  }

  // Вход через Google
  async signInWithGoogle(): Promise<any> {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(this.auth, provider);
      return result;
    } catch (error) {
      throw error;
    }
  }

  // Выход
  async signOut(): Promise<void> {
    try {
      await signOut(this.auth);
    } catch (error) {
      throw error;
    }
  }

  // Получить текущего пользователя
  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }

  // Проверить, авторизован ли пользователь
  isAuthenticated(): boolean {
    return this.auth.currentUser !== null;
  }

  // Получить токен пользователя
  async getToken(): Promise<string | null> {
    const user = this.auth.currentUser;
    if (user) {
      return await user.getIdToken();
    }
    return null;
  }
}

