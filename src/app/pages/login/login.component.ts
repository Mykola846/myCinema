import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  isLoading: boolean = false;
  error: string = '';

  constructor(private auth: AuthService, private router: Router) {}

  async login() {
    this.isLoading = true;
    this.error = '';
    try {
      await this.auth.signInWithEmail(this.email, this.password);
      this.router.navigate(['/movies']);
    } catch (e: any) {
      this.error = e?.message || 'Ошибка входа';
    } finally {
      this.isLoading = false;
    }
  }
}
