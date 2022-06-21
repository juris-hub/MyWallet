import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, ReplaySubject } from 'rxjs';
import { Coin } from '../Coin';

@Injectable({
  providedIn: 'root',
})
export class AddCoinService {
  public currentUserIdSubject = new ReplaySubject(1);
  public currentUserId$ = this.currentUserIdSubject.asObservable();

  constructor(public afs: AngularFirestore, private afAuth: AngularFireAuth) {
    this.afAuth.user.subscribe((user) =>
      this.currentUserIdSubject.next(user?.uid)
    );
  }

  // update(data:Coin){
  //   return this.afs.doc<Coin>('coins')
  // }

  addItem(walletId: string, data: any) {
    return this.afs
      .doc('wallets/' + walletId)
      .collection('coins')
      .add(data);
  }

  deleteItem(walletId: string, itemId: any) {
    return this.afs
      .doc('wallets/' + walletId)
      .collection('coins')
      .doc(itemId)
      .delete();
  }

  getUserWallet(currentUserId: any) {
    return this.afs
      .collection('wallets', (ref) => ref.where('ownerId', '==', currentUserId))
      .snapshotChanges()
      .pipe(
        map((actions) => {
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
}
