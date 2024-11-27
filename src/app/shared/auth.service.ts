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
    this.fireauth.signInWithEmailAndPassword(email, password).then((userCredential) => {
      const uid = userCredential.user?.uid;
      localStorage.setItem('token', 'true');
      localStorage.setItem('currentUser', email);
  
      if (uid) {
        this.firestore.collection('users').doc(uid).get().toPromise().then((doc) => {
          if (doc && doc.exists) {
            const userInfo = doc.data() as UserInfo;
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
            console.log('User info retrieved and saved to localStorage:', userInfo);
          } else {
            console.log('No user data found in Firestore for the current user.');
          }
        }).catch(error => {
          console.error('Error retrieving user data:', error);
        });
      }
  
      this.router.navigate(['/']);
    }).catch(err => {
      alert(err.message);
      this.router.navigate(['/login']);
    });
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
          const currentUserEmail = localStorage.getItem('currentUser');
          const userInfoStr = localStorage.getItem('userInfo');
          if (userInfoStr) {
            const storedUserInfo = JSON.parse(userInfoStr);
            if (storedUserInfo.email === currentUserEmail) {
              return {
                ...storedUserInfo,
                uid: user.uid,
                email: user.email || '',
                birthday: storedUserInfo.birth,
                name: storedUserInfo.name,
              };
            }
          }
          return {
            uid: user.uid,
            email: user.email || '',
          };
        }
        return null;
      })
    );
  }
}
