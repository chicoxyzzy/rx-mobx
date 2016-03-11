import Rx from 'rxjs/Rx';

export function mobxToRx(mobx) {
  return Rx.Observable.create((observer) =>
    mobx.observe(value => observer.next(value))
  );
}
