/* [Utils.animations] - an array of animations that the 'animate function ' aka the 'render loop' will call
 *                    if they exist. Utils.handleAnimations() calls these functions. To trigger it to not
 *                    call you have to set a property isAnimating to false in the callback
 *
 *  [array] of {animation}
 * * */
Utils.animations = [];


/* (Utils.handleError) - is a function that will console.warn a passed error message and return false
 *                       return this function() in order to dry up console.warn() followed with return false
 * * */
Utils.handleError = function(err) {
  console.warn(err);
  return false;
};

/* warn - a shorthand name for (Utils.handleError) */
var warn = Utils.handleError;

/* (Utils.transition) - is a function that accepts an options object and creates an {animation} object
 *                      then places in the [Utils.animations] array. To be assessed during callback
 *
 *                    Example options object
 *                    {
 *                      mesh: {AThreeMesh},
 *                      type: 'fade-out',
 *                      duration: 1000,
 *                    }
 * * * */

Utils.transition = function(options) {

  /* Let the morph begin! Create a the animation object */
  var animation = {};

  /* Give useful errors if used incorrectly */
  if (!options) {
    return warn('A valid options object was not passed to the transition Utils.transition function');
  }

  /* Only warns if its undefined or null ...
   * TODO find a way to accurately check if it is a Three.Mesh
   *      or accept any object and make it fully abstract
   * * */
  if (typeof(options.mesh) === 'undefined' || options.mesh === null) {
    return warn('A valid mesh object was not passed to transition Utils.transition.  You cannot animate nothing!');
  }

  if (typeof(options.type) === 'undefined' || options.type === null) {
    animation.type = 'fade-out';
    defaultTranstionMessage();
  }

  if (typeof(options.duration) !== 'number') {
    return warn('no duration was passed transition Utils.transition.  You cannot animate over no time just use an = sign');
  }

  /* copy all props on the {options} object into the {animation} object
  *  TODO: since the var is hoisted in es5 either add an es6 transpiler or declare
  *        'var prop' at the top of the function
  * * * */
  for (var prop in options ) {
    animation[prop] = options[prop];
  }

  /* since this object was created then we want to kick off its animation process by setting
   * isAnimating method to true
   * * * */
  animation.isAnimating = true;

  /*  applyAnimation assumes an object that is created from the options argument this object will
   *                 have an agruments object {.opts} to pass to its callback function (.callback)
   *
   * */
  animation.applyAnimation = getObjectByType(animation.type, animation.opts);

  /* Let the fun begin! Push the newly created animation object into the array. */
  Utils.animations.push(animation);

};

/* (getObjectByType) - is a function that accepts a String: "type" and an object {opts}
 *
 *                       opts is the ability to call a stop value from the parent function
 *                       giving custom input from the transition interface
 * * */
function getObjectByType(type, opts){

  var payload = {};

  /* tween is a dynamic function that will be created by the type value given
   *   this is a full list of supported types of the transition object and must
   *   be extended to add more transition types
   *
   *   callback ALWAYS becomes tween. The opts object we create tells it how to behave
   * * * */
  payload.callback = tween;

  /* tween definitions
   *
   * * * */
  switch (type) {
    case 'fade-out': payload.opts = { stop: 0, prop: 'mesh.material.opacity' }; return payload;
    case 'fade-in': payload.opts = { stop: 1, prop: 'mesh.material.opacity' }; return payload;
    case 'move-x': payload.opts = { stop: opts.stop, prop: 'mesh.position.x' }; return payload;
    case 'move-y': payload.opts = { stop: opts.stop, prop: 'mesh.position.y' }; return payload;
    case 'move-z': payload.opts = { stop: opts.stop, prop: 'mesh.position.z' }; return payload;
    default: warn('Internal Code Problem! Default animation.type was NOT set to \'fade-out\'.');
  }

}

/* getParentObject - is a function that accepts a property string and a parent object. It will return the last object
 *                   in relation to that property name. So 'mesh.position.x' would return the object on.mesh.position
 * * * */
function getParentObject (str, on) {

  /* Turn the string into an array and remove the last element because it is a value and not an object */
  var res = str.split('.');
  res.pop();

  /* After romoving the last element of the array if the array is empty then the passed object {on} is the
   * closest parent object to the value. So we return it.
   * * * */
  if(res.length === 0){
    return on;
  }

  /* Since the array was longer then 0 we need to find the parent object by reducing through the array of property names.  The last
   * entry will have traversed us from the on object to the final reference object we can use
   * * * */
  return res.reduce(function (obj, propName) {
    return obj[propName];
  }, on);

}

/* getPropName - does a similar thing to getParentObject but just returns the popped value as it is the known property name
 * * * */
function getPropName (str) {
  return str.split('.').pop();
}

/* tween - is called with an opts object that the getObjectByType returns in its payload.opts
 *         its entire behavior is based on the opts passed and the parent passed in allows this
 *         function to be fully abstract in nature
 * * * */
function tween (opts, parent) {

  /* from opts.prop and parent we can call getParentObject and return the object we will target this function, from opts.prop
   * we can also get the propertyName to call ON the target object
   * * * */
  var target = getParentObject(opts.prop, parent),
      propName = getPropName(opts.prop);

  /* apply an add or subtract to the appropriate value on the reference object based the relationship
   * of its value compared to stop's value
   * * * */

  /* Subtract the delta time (time since last frame) from the duration in order to control the length of time
   * that this animation is alive
   * * * */
  parent.duration -= SceneManager.delta;

  /* If duration has run out then set animating to false and let the handler destroy the object that owns
   * this function
   * * * */
  if ( parent.duration <= 0 || !addOrSubtract(target, propName, opts.stop, parent) ) {
    parent.mesh.isAnimating = false;
    parent.isAnimating = false;
  }

}

/* addOrSubtract - will apply the appropriate amount based on the number of frames left between duration and last delta time call
 *   it will return true if a addition happened and false if the two numbers are equal
 * * * */
function addOrSubtract (target, propName, stop, parent) {

  parent.amount = (Math.abs(target[propName]-stop))/(parent.duration/SceneManager.delta);

  if (target[propName] > stop) {
    target[propName] -= parent.amount;
    return true;
  } else if ( target[propName] < stop ) {
    target[propName] += parent.amount;
    return true;
  }

  return false;

}

function defaultTranstionMessage () {

  console.warn('A valid transition was not passed.  Applying a default fade-out!');

}
