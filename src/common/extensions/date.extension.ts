Date.prototype.addHours = function(hours: number): Date {

  const newDate = new Date(this);

  newDate.setHours(this.getHours() + hours);

  return newDate;
};
