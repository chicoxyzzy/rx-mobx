import tape from 'tape';
import Rx from 'rxjs/Rx';
import { observable } from 'mobservable';
import { rxToMobservable, mobservableToRx } from '../';

tape('mobservable to rx', t => {
  t.plan(3);
  let counter = 1;
  const mobservable = observable(null);
  const rxObservable = mobservableToRx(mobservable).subscribe(value => t.equal(value, counter));
  for (; counter < 4; counter++) {
    mobservable(counter);
  }
  rxObservable.unsubscribe();
});

tape('rx to mobservable', t => {
  t.plan(3);
  let counter = 1;
  const rxSubject = new Rx.Subject();
  const mobservble = rxToMobservable(rxSubject).observe(value => t.equal(value, counter));
  for (; counter < 4; counter++) {
    rxSubject.next(counter);
  }
  mobservble();
});
