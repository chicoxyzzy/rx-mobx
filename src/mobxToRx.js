import Rx from 'rxjs/Rx';

export function mobxToRx(mobx) {
  return Rx.Observable.create((observer) => {
    return mobx.observe(value => observer.next(value));
  });
}
