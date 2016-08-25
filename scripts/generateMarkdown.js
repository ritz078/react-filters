function stringOfLength(string, length) {
  var newString = '';
  for (var i = 0; i < length; i++) {
    newString += string;
  }
  return newString;
}

function generateTitle(name) {
  var title = '`' + name + '` (component)';
  return title + '\n' + stringOfLength('=', title.length) + '\n';
}

function generateDesciption(description) {
  return description + '\n';
}

function generatePropType(type, includeType = true) {
  var values;
  if (Array.isArray(type.value)) {
    values = '(' +
      type.value.map(function(typeValue) {
        return typeValue.name || typeValue.value;
      }).join('|') +
      ')';
  } else {
    values = type.value;
  }

  return (includeType ? 'type: `' : '`') + type.name + (values ? values: '') + '`\n';
}

function generatePropDefaultValue(value) {
  return value.value.indexOf('function') >= 0 ?
    '\ndefaultValue: \n```js\n' + value.value + '\n```' : 'defaultValue: `' + value.value + '`\n';
}

function generateProp(propName, prop) {
  return (
    '### `' + propName + '`' + (prop.required ? ' (required)' : '') + '\n' +
    (prop.type ? generatePropType(prop.type) : '') +
    (prop.defaultValue ? generatePropDefaultValue(prop.defaultValue) : '') +
    '\n' +
    (prop.description ? prop.description + '\n\n' : '') +
    '\n'
  );
}

function propTable (propName, prop) {
  return (
    '[' +propName + '](#'+ propName +')' + '|' + (prop.required ? '✔️' : ' ') + '|' + (prop.type ? generatePropType(prop.type, false) : '\n')
  )
}

function generateProps(props) {
  var title = 'Props';

  return (
    title + '\n' +
    stringOfLength('-', title.length) + '\n' +
    '\n' +
    'prop name | isRequired | type\n-------|------|------\n' +
      Object.keys(props).sort().map(function (propName) {
        return  propTable(propName, props[propName])
      }).join('')+
    Object.keys(props).sort().map(function(propName) {
      return generateProp(propName, props[propName]);
    }).join('\n')
  );
}

function generateMarkdown(name, reactAPI) {
  return generateTitle(name) + '\n' +
    generateDesciption(reactAPI.description) + '\n' +
    generateProps(reactAPI.props);
}

module.exports = generateMarkdown;
