import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import * as React from 'react';
import FileIcon from '@material-ui/icons/Code';
import FolderIcon from '@material-ui/icons/Folder';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  paper: {
    marginTop: theme.spacing(3),
    width: '100%',
    overflowX: 'auto',
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 650
  }
}));

export function createRowData(name: string, author: string, date: Date) {
  return { name, author, date };
}

interface FileTableProps {
  data: FileTableRowProp[];
}

export const FileTable: React.FunctionComponent<FileTableProps> = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Table className={classes.table} size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Last modified</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data.map((d, index) => (
              <FileTableRow
                key={index}
                name={d.name}
                author={d.author}
                date={d.date}
                kind={d.kind}
              />
            ))}
          </TableBody>
        </Table>
      </Paper>
      {props.children}
    </div>
  );
};

interface FileTableRowProp {
  name: string;
  author: string;
  date: Date;
  kind: 'file' | 'dir';
}

export const FileTableRow: React.FunctionComponent<FileTableRowProp> = (props) => (
  <TableRow>
    <TableCell>
      {props.kind === 'file' ? (
        <FileIcon fontSize="small" style={{ verticalAlign: 'middle' }} />
      ) : (
        <FolderIcon fontSize="small" style={{ verticalAlign: 'middle' }} />
      )}
      <span style={{ verticalAlign: 'middle', paddingLeft: 4 }}>
        <a href="#">{props.name} </a>
      </span>
    </TableCell>
    <TableCell>{props.author}</TableCell>
    <TableCell>{props.date.toLocaleString()}</TableCell>
  </TableRow>
);
