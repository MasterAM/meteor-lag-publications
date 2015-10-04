var cachedUnblock;
var dummy = function() {
  return false;
};


var originalSub = MeteorX.Session.prototype.protocol_handlers.sub;
MeteorX.Session.prototype.protocol_handlers.sub = function(msg, unblock) {
  var self = this;
  // cacheUnblock temporarly, so we can capture it later
  // we will use unblock in current eventLoop, so this is safe
  cachedUnblock = unblock;
  originalSub.call(self, msg, unblock);
  // cleaning cached unblock
  cachedUnblock = null;
};

//override original meteorhacks:unblock implementation
MeteorX.Session.prototype._startSubscription = function (handler, subId, params, name) {
  var sub = new MeteorX.Subscription(this, handler, subId, params, name);

  var unblockHander = cachedUnblock;
  // _startSubscription may call from a lot places
  // so cachedUnblock might be null in somecases
  if(!unblockHander) {
    unblockHander = dummy;
  }
  // assign the cachedUnblock
  sub.unblock = unblockHander ;

  if(subId) {
    this._namedSubs[subId] = sub;
  } else {
    this._universalSubs.push(sub);
  }

  sub._runHandler();
};

//wrap original meteorhacks:unblock implementation
var originalRunHandler = MeteorX.Subscription.prototype._runHandler;
MeteorX.Subscription.prototype._runHandler = function() {
  if(!this.unblock) {
    this.unblock = dummy;
  }
  originalRunHandler.call(this);
};
