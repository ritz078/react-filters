import clone from '../utils/clone';

export default function (style, theme) {
  const defaultStyle = {
    main: {
      display: 'inline-block'
    },
    wrapper: {
      backgroundColor: 'red',
      width: theme.width,
      height: theme.height,
      borderRadius: theme.height / 2,
      padding: theme.padding,
      display: 'inline-block',
      position: 'relative',
      transition: 'all .3s ease-in-out',
      boxSizing: 'border-box'
    },
    wrapperOn: {
      backgroundColor: '#40DC40'
    },
    btn: {
      height: theme.height - (theme.padding * 2),
      width: theme.height - (theme.padding * 2),
      position: 'absolute',
      backgroundColor: 'white',
      borderRadius: '50%',
      cursor: 'pointer',
      transition: 'all .3s ease-in-out',
      left: theme.padding
    },
    btnOn: {
      left: '100%',
      marginLeft: -(theme.height - theme.padding)
    },
    label: {
      display: 'inline-block'
    },
    labelAfter: {
      float: 'right'
    }
  };

  return clone(defaultStyle, style);
}
