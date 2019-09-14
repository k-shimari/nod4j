import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FileIcon from '@material-ui/icons/Code';
import FolderIcon from '@material-ui/icons/Folder';
import { ProjectItem, ProjectItemBase } from 'app/models/project';
import * as React from 'react';

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
  onFileClick?(fileName: string): void;
  onDirClick?(dirName: string): void;
}

export const FileTable: React.FunctionComponent<FileTableProps> = (props) => {
  const classes = useStyles();
  const { data, onFileClick, onDirClick } = props;

  return (
    <div>
      <Paper className={classes.paper}>
        <Table className={classes.table} size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              {/* <TableCell>Author</TableCell>
              <TableCell>Last modified</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((d, index) => (
              <FileTableRow
                key={index}
                {...d}
                onClick={() => {
                  if (d.type === 'file' && onFileClick) {
                    onFileClick(d.name);
                  }
                  if (d.type === 'dir' && onDirClick) {
                    onDirClick(d.name);
                  }
                }}
              />
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
};

export interface FileTableRowProp extends ProjectItemBase {
  navigateTo: string;
  onClick?(): void;
}

const FileTableRow: React.FunctionComponent<FileTableRowProp> = (props) => {
  const { name, navigateTo, onClick } = props;
  return (
    <TableRow>
      <TableCell>
        {props.type === 'file' ? (
          <FileIcon fontSize="small" style={{ verticalAlign: 'middle' }} />
        ) : (
          <FolderIcon fontSize="small" style={{ verticalAlign: 'middle' }} />
        )}
        <span style={{ verticalAlign: 'middle', paddingLeft: 4 }}>
          <a
            onClick={onClick}
            title={name}
            href={navigateTo}
            target={props.type === 'file' ? '_blank' : ''}
          >
            {name}
          </a>
        </span>
      </TableCell>
      {/* <TableCell>N/A</TableCell>
      <TableCell>N/A</TableCell> */}
    </TableRow>
  );
};
