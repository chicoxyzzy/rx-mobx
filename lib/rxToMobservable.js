'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rxToMobservable = rxToMobservable;

var _mobservable = require('mobservable');

function rxToMobservable(rxSubject) {
  var mobservable = (0, _mobservable.observable)(null);
  rxSubject.subscribe(function (x) {
    return mobservable(x);
  }, function (e) {
    throw new Error(e);
  });
  var dispose = function dispose() {
    rxSubject.complete();
    mobservable();
  };
  dispose.observe = mobservable.observe;
  return dispose;
}