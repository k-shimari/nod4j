// import { Button, Divider, makeStyles, Paper, Typography } from '@material-ui/core';
// import { ContentContainer } from 'app/components/atoms/contentContainer';
// import * as React from 'react';

// /**
//  * Set the style for OpenProject.
//  */
// const useStyles = makeStyles((theme) => ({
//   root: {
//     padding: theme.spacing(4, 4)
//   },
//   section: {
//     padding: theme.spacing(3, 0)
//   }
// }));

// type FileSelectedEventHandler = (fileName: string, fullText: string) => void;

// interface FileInputProps {
//   title: string;
//   selectedFile?: string;
//   onFileSelected?: FileSelectedEventHandler;
// }

// function FileInput(props: FileInputProps) {
//   const { title, selectedFile, onFileSelected } = props;

//   function handleChange(files: FileList) {
//     const file = files[0];
//     const { name } = file;
//     const reader = new FileReader();
//     reader.readAsText(file);
//     reader.onload = (e) => {
//       const r = (e.target! as any).result as string;
//       onFileSelected && onFileSelected(name, r);
//     };
//   }

//   return (
//     <div style={{ display: 'flex' }}>
//       <div style={{ flexGrow: 1 }}>
//         <Typography variant="h6" color="textSecondary">
//           {title}
//         </Typography>
//       </div>
//       <Typography noWrap style={{ width: 300 }}>
//         {selectedFile || ''}
//       </Typography>
//       <Button variant="contained" component="label">
//         Choose
//         <input
//           accept=".json"
//           type="file"
//           style={{ display: 'none' }}
//           onChange={(e) => handleChange(e.target.files!)}
//         />
//       </Button>
//     </div>
//   );
// }

// export function OpenProject() {
//   const classes = useStyles();
//   const [fileinfoJson, setFileinfoJson] = React.useState('');
//   const [varinfoJson, setVarinfoJson] = React.useState('');

//   const doneButtonEnabled = fileinfoJson && varinfoJson;

//   const onFileinfoJsonSelected: FileSelectedEventHandler = (fileName, fullText) => {
//     setFileinfoJson(fileName);
//     console.log(fileName, fullText);
//   };

//   const onVarinfoJsonSelected: FileSelectedEventHandler = (fileName, fullText) => {
//     setVarinfoJson(fileName);
//     console.log(fileName, fullText);
//   };

//   return (
//     <ContentContainer>
//       <Paper className={classes.root}>
//         <Typography variant="h4">Open project</Typography>
//         <div className={classes.section}>
//           <FileInput
//             title="1. Choose fileinfo.json."
//             selectedFile={fileinfoJson}
//             onFileSelected={onFileinfoJsonSelected}
//           />
//         </div>
//         <Divider />
//         <div className={classes.section}>
//           <FileInput
//             title="2. Choose varinfo.json."
//             selectedFile={varinfoJson}
//             onFileSelected={onVarinfoJsonSelected}
//           />
//         </div>
//         <Divider />
//         <div className={classes.section}>
//           <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
//             <Button variant="contained" disabled={!doneButtonEnabled} color="primary">
//               Done
//             </Button>
//           </div>
//         </div>
//       </Paper>
//     </ContentContainer>
//   );
// }
