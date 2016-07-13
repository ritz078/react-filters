export default function (element, className) {
  const classes = element.className.split(' ');
  const i = classes.indexOf(className);
  if (i !== -1) {
    classes.splice(i, 1);
  }
  return classes.join(' ');
}
