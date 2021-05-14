/* eslint no-underscore-dangle: 'off' */
/* eslint no-console: 'off' */

import { withStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
    fontFamily: 'monospace',
    fontSize: 20,
    position: 'sticky',
    top: 0,
  },
  body: {
    fontSize: 16,
  },
  footer: {
    fontSize: 25,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
      backgroundColor: theme.palette.action.selected,
  },
}))(TableRow);

const StyledTableRow2 = withStyles((theme) => ({
  root: {
      backgroundColor: theme.palette.action.hover,

  },
}))(TableRow);

export { StyledTableCell, StyledTableRow, StyledTableRow2 };
