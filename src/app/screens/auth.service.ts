import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private httpKlien: HttpClient) { }

  logout(){
    const token = localStorage.getItem('token').toString();
    this.httpKlien.delete(environment.baseUrl + '/api/auth/logout/' + token).pipe(map(data => data )).subscribe(resp => {
      localStorage.removeItem('token');
      localStorage.removeItem('currentLogin');
      this.router.navigate(['/login']);
    });
  }
}
