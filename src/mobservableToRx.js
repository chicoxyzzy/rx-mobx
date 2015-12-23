import Rx from 'rxjs/Rx';

export function mobservableToRx(mobservable) {
  return Rx.Observable.create((observer) => {
    return mobservable.observe(value => observer.next(value));
  });
}
