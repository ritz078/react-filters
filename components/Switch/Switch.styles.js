import deepAssign from 'deep-assign';
import styleProcessor from '../utils/styleProcessor';

export default function (style, theme, options) {
  const defaultStyle = {
    base:{
      main: {
        display: 'inline-block'
      },
      wrapper: {
        backgroundColor: theme.offColor,
        width: theme.width,
        height: theme.height,
        borderRadius: theme.height / 2,
        padding: theme.padding,
        display: 'inline-block',
        position: 'relative',
        transition: 'all .3s ease-in-out',
        boxSizing: 'border-box'
      },

      btn: {
        height: theme.height - (theme.padding * 2),
        width: theme.height - (theme.padding * 2),
        position: 'absolute',
        backgroundColor: theme.btnColor,
        borderRadius: '50%',
        cursor: 'pointer',
        transition: 'all .3s ease-in-out',
        left: theme.padding
      },

      label: {
        display: 'inline-block'
      },
      labelAfter: {
        float: 'right'
      }
    },

    active:{
      wrapper:{
        backgroundColor: theme.onColor
      },
      btn: {
        left: '100%',
        marginLeft: -(theme.height - theme.padding)
      }
    },
    disabled: {
      wrapper: {
        backgroundColor: 'grey'
      }
    }
  };

  const customStyle = deepAssign({}, defaultStyle, style);
  return styleProcessor(customStyle, options);
}
