import { observable } from 'mobx';

export function rxToMobx(rxSubject) {
  const mobx = observable(null);
  rxSubject.subscribe(
    x => mobx.set(x),
    e => { throw new Error(e); }
  );
  const dispose = () => {
    rxSubject.complete();
  };
  dispose.observe = mobx.observe.bind(mobx);
  return dispose;
}
