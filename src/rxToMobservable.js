import { observable } from 'mobservable';

export function rxToMobservable(rxSubject) {
  const mobservable = observable(null);
  rxSubject.subscribe(
    x => mobservable(x),
    e => { throw new Error(e); }
  );
  const dispose = () => {
    rxSubject.complete();
    mobservable();
  };
  dispose.observe = mobservable.observe;
  return dispose;
}
