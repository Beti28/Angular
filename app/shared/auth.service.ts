import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { UserInfo } from '../model/user-info';
import { Observable, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private fireauth: AngularFireAuth, private router: Router, private firestore: AngularFirestore) { }


  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(() => {
      localStorage.setItem('token', 'true');
      this.router.navigate(['/']);
    }, err => {
      alert(err.message);
      this.router.navigate(['/login']);
    })
    localStorage.setItem('currentUser', email);
  }


  register(email: string, password: string, name: string, birth: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then((userCredential) => {
      alert('Registration Successful');
      const uid = userCredential.user?.uid;
  
   
      if (uid) {
        const userInfo = { name, birth, email };
        this.firestore.collection('users').doc(uid).set(userInfo).then(() => {
          console.log('User data saved to Firestore');
        }).catch(error => {
          console.error('Error saving user data to Firestore:', error);
        });
      }
  
      
      const localUserInfo = { name, birth, email };
      localStorage.setItem('userInfo', JSON.stringify(localUserInfo));
      localStorage.setItem('currentUser', email);
      console.log('User info saved in localStorage:', localStorage.getItem('userInfo'));
  
      this.router.navigate(['/']);
    }).catch(err => {
      alert(err.message);
      this.router.navigate(['/register']);
    });
  }
  getCurrentUser(): string | null {
    return localStorage.getItem('currentUser');
  }
  isLoggedIn(): boolean {
    const user = localStorage.getItem('user');
    return !!user; 
  }
  getUserInfo(): Observable<UserInfo | null> {
    return this.fireauth.authState.pipe(
      map(user => {
        if (user) {
          console.log('Firebase user:', user); 
          const userInfoStr = localStorage.getItem('userInfo');
          
          if (userInfoStr) {
            const storedUserInfo = JSON.parse(userInfoStr);
            console.log('Stored User Info:', storedUserInfo); 
  
            
            return { 
              ...storedUserInfo, 
              uid: user.uid, 
              email: user.email || '', 
              birthday: storedUserInfo.birth
            };
          }
  
          console.log('No stored user info, returning Firebase user data');
          return { 
            uid: user.uid, 
            email: user.email || '' 
          };
        } else {
          console.log('No user logged in');
          return null;
        }
      })
    );
  }
}

