Utils.animations = [];

Utils.handleError = function(err) {
  console.warn(err);
  return false;
};

var warn = Utils.handleError;

/* Example options object
 * {
 *   mesh: AThreeMesh,
 *   type: 'fade-out',
 *   duration: 1000,
 * }
 * * * */

Utils.transition = function(options) {

  var animation = {};

  if (!options) {
    return warn('A valid options object was not passed to the transition Utils.transition function');
  }

  /* Only warns if its undefined or null ...
   * TODO find a way to accurately check if it is a Three.Mesh
   * * */
  if (typeof(options.mesh) === 'undefined' || options.mesh === null) {
    return warn('A valid mesh object was not passed to transition Utils.transition.  You cannot animate nothing!');
  }

  if (typeof(options.type) === 'undefined' || options.type === null) {
    animation.type = 'fade-out';
    defaultTranstionMessage();
  }

  for (var prop in options ) {
    animation[prop] = options[prop];
  }

  animation.isAnimating = true;
  animation.apply = getFunctionByType(animation.type, animation.opts);
  Utils.animations.push(animation);

};

function getFunctionByType(type, opts){

  var payload = {};

  payload.call = tween;

  switch (type) {
    case 'fade-out': payload.opts = { stop: 0, prop: 'mesh.material.opacity' }; return payload;
    case 'fade-in': payload.opts = { stop: 1, prop: 'mesh.material.opacity' }; return payload;
    case 'move-x': payload.opts = { stop: opts.stop, prop: 'mesh.position.x' }; return payload;
    case 'move-y': payload.opts = { stop: opts.stop, prop: 'mesh.position.y' }; return payload;
    case 'move-z': payload.opts = { stop: opts.stop, prop: 'mesh.position.z' }; return payload;
    default: defaultTranstionMessage(); return FadeOut;
  }

}

function getParentObject (str, on) {

  var res = str.split('.');

  if(res.length === 1){
    return on;
  }

  res.pop();

  return res.reduce(function (current, next) {
    return current[next];
  }, on);

}

function getProp (str) {

  return str.split('.').pop();

}

function tween (opts, parent) {

  var target = getParentObject(opts.prop, parent),
      propName = getProp(opts.prop);

  this.opts = opts;

  var operator = addOrSubtract(target[propName], opts.stop);

  parent.amount = target[propName]/(parent.duration/SceneManager.delta);

  if (operator === '-') {
    parent.amount = (target[propName]-opts.stop)/(parent.duration/SceneManager.delta);
    target[propName] -= parent.amount;
  } else if (operator === '+') {
    parent.amount = (opts.stop-target[propName])/(parent.duration/SceneManager.delta);
    target[propName] += parent.amount;
  }

  parent.duration -= SceneManager.delta;

  if ( parent.duration <= 0 ) {
    parent.mesh.isAnimating = false;
    parent.isAnimating = false;
  }

}

function addOrSubtract (start, end) {

  if (start > end) {
    return '-';
  } else if ( start < end ) {
    return '+';
  }

  return '?';

}

function defaultTranstionMessage () {

  console.warn('A valid transition was not passed.  Applying a default fade-out!');

}
