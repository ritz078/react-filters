/**
 * binds all the methods with the passed context
 * Eg : autoBind(['method1', 'method2'], this)
 *      is same as
 *      this.method1 = this.method1.bind(this);
 *      this.method2 = this.method2.bind(this);
 *
 * @param methods => An array of method names
 * @param context => the binding `this` context
 */
export default function (methods, context) {
  methods.forEach(method => {
    // eslint-disable-next-line no-param-reassign
    context[method] = context[method].bind(context);
  });
}

