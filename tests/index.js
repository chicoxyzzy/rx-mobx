import tape from 'tape';
import Rx from 'rxjs/Rx';
import { observable } from 'mobx';
import { rxToMobx, mobxToRx } from '../src';

tape('mobx to rx', t => {
  t.plan(3);
  let counter = 1;
  const mobx = observable(null);
  const rxObservable = mobxToRx(mobx).subscribe(value => t.equal(value, counter));
  for (; counter < 4; counter++) {
    mobx.set(counter);
  }
  rxObservable.unsubscribe();
});

tape('rx to mobx', t => {
  t.plan(3);
  let counter = 1;
  const rxSubject = new Rx.Subject();
  const mobservble = rxToMobx(rxSubject).observe(value => t.equal(value, counter));
  for (; counter < 4; counter++) {
    rxSubject.next(counter);
  }
  mobservble();
});
