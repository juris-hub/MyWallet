import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, ReplaySubject, tap } from 'rxjs';
import { Coin } from '../Coin';
import { startOfDay } from 'date-fns';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class CoinService {
  coingecko: string = 'https://api.coingecko.com/api/v3/coins/';

  coins$ = this.http
    .get<Coin[]>(
      `${this.coingecko}markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false
  `
    )
    .pipe(tap(console.log));

  constructor(
    private http: HttpClient,
    public afs: AngularFirestore,
    private afAuth: AngularFireAuth
  ) {
    this.afAuth.user.subscribe((user) =>
      this.currentUserIdSubject.next(user?.uid)
    );
  }

  getHistoricalData(daysAgo: number, coinId: string) {
    let today = new Date().getTime();
    let day = (
      new Date(today - daysAgo * 24 * 60 * 60 * 1000).getTime() / 1000
    ).toFixed();
    let todayUnix = (today / 1000).toFixed(0);
    return this.http.get<Coin[]>(
      `${this.coingecko}${coinId}/market_chart/range?vs_currency=USD&from=${day}&to=${todayUnix}`
    );
  }

  public currentUserIdSubject = new ReplaySubject(1);
  public currentUserId$ = this.currentUserIdSubject.asObservable();

  // update(data:Coin){
  //   return this.afs.doc<Coin>('coins')
  // }

  addItem(walletId: string, data: any) {
    return this.afs
      .doc('wallets/' + walletId)
      .collection('coins')
      .add(data);
  }

  deleteItem(walletId: string, coinId: any) {
    return this.afs
      .doc('wallets/' + walletId)
      .collection('coins')
      .doc(coinId)
      .delete();
  }

  updateItem(walletId: string, coinId: any, data: any) {
    return this.afs
      .doc('wallets/' + walletId)
      .collection('coins')
      .doc(coinId)
      .update(data);
  }

  getUserWallet(currentUserId: any) {
    console.log('čiribučiriba');
    return this.afs
      .collection('wallets', (ref) => ref.where('ownerId', '==', currentUserId))
      .snapshotChanges()
      .pipe(
        map((actions) => {
          console.log('Get user wallet was triggered');
          return actions.map((action) => {
            const data = action.payload.doc.data() as any;
            const id = action.payload.doc.id;
            return {
              id,
              ...data,
            };
          });
        })
      );
  }

  getUserCoins(walletId: any) {
    return this.afs
      .doc('wallets/' + walletId)
      .collection('coins')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((action) => {
            const data = action.payload.doc.data();
            const id = action.payload.doc.id;
            return {
              ...data,
              id: id,
            };
          });
        })
      );
  }
}
