'use strict';

var _tape = require('tape');

var _tape2 = _interopRequireDefault(_tape);

var _Rx = require('rxjs/Rx');

var _Rx2 = _interopRequireDefault(_Rx);

var _mobservable = require('mobservable');

var _ = require('../');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _tape2.default)('mobservable to rx', function (t) {
  t.plan(3);
  var counter = 1;
  var mobservable = (0, _mobservable.observable)(null);
  var rxObservable = (0, _.mobservableToRx)(mobservable).subscribe(function (value) {
    return t.equal(value, counter);
  });
  for (; counter < 4; counter++) {
    mobservable(counter);
  }
  rxObservable.unsubscribe();
});

(0, _tape2.default)('rx to mobservable', function (t) {
  t.plan(3);
  var counter = 1;
  var rxSubject = new _Rx2.default.Subject();
  var mobservble = (0, _.rxToMobservable)(rxSubject).observe(function (value) {
    return t.equal(value, counter);
  });
  for (; counter < 4; counter++) {
    rxSubject.next(counter);
  }
  mobservble();
});
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _rxToMobservable = require('./rxToMobservable');

Object.defineProperty(exports, 'rxToMobservable', {
  enumerable: true,
  get: function get() {
    return _rxToMobservable.rxToMobservable;
  }
});

var _mobservableToRx = require('./mobservableToRx');

Object.defineProperty(exports, 'mobservableToRx', {
  enumerable: true,
  get: function get() {
    return _mobservableToRx.mobservableToRx;
  }
});
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mobservableToRx = mobservableToRx;

var _Rx = require('rxjs/Rx');

var _Rx2 = _interopRequireDefault(_Rx);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mobservableToRx(mobservable) {
  return _Rx2.default.Observable.create(function (observer) {
    return mobservable.observe(function (value) {
      return observer.next(value);
    });
  });
}
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
