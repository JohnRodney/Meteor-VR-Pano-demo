Utils.animate = function animate(objsToUpdate) {
  objsToUpdate.forEach((obj) => { obj.update(); });
  requestAnimationFrame(() => { this.animate(objsToUpdate); });
};
