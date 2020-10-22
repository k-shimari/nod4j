import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FileIcon from '@material-ui/icons/Code';
import FolderIcon from '@material-ui/icons/Folder';
import { ProjectItem, ProjectItemBase } from 'app/models/project';
import * as React from 'react';

/**
 * Set styles for fileTable.
 */
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

// export function createRowData(name: string, author: string, date: Date) {
//   return { name, author, date };
// }


interface FileTableProps {
  data: FileTableRowProp[];
  onFileClick?(fileName: string): void;
  onDirClick?(dirName: string): void;
}


/**
 * return the fileTable which shows the files and the directories in the specified directory in the project
 */
export const FileTable: React.FunctionComponent<FileTableProps> = (props) => {
  const classes = useStyles();
  const { data, onFileClick, onDirClick } = props;
  const fileData = data.filter((d) => {
    return d.type === 'file';
  });
  const dirData = data.filter((d) => {
    return d.type === 'dir';
  });

  return (
    <div>
      <Paper className={classes.paper}>
        <Table className={classes.table} size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dirData.map((d, index) => (
              <FileTableRow
                key={'dir' + index}
                {...d}
                onClick={() => {
                  if (onDirClick) {
                    onDirClick(d.name);
                  }
                }}
              />
            ))}
            {fileData.map((d, index) => (
              <FileTableRow
                key={'file' + index}
                {...d}
                onClick={() => {
                  if (onFileClick) {
                    onFileClick(d.name);
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

/**
 * @param props 
 * Return the link to target directory or file contents. 
 */
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
    </TableRow>
  );
};
