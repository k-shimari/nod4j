import * as Path from 'path';

export function splitPathToDirsAndFile(
  prefix: string,
  path: string
): { dirs: string[]; file: string } {
  if (path.indexOf('/' + prefix) !== 0) {
    throw new Error('Impossible');
  }

  const relativeDir = Path.relative(prefix, path);
  const dirs = relativeDir ? relativeDir.split('/') : [];

  const parentDirs = dirs.length > 0 ? dirs.slice(0, dirs.length - 1) : [];
  const currentDir = dirs.length > 0 ? dirs[dirs.length - 1] : '';

  return { dirs: parentDirs, file: currentDir };
}

export function splitPathToDirs(prefix: string, path: string): { dirs: string[] } {
  if (path.indexOf('/' + prefix) !== 0) {
    throw new Error('Impossible');
  }

  const relativeDir = Path.relative(prefix, path);
  const dirs = relativeDir ? relativeDir.split('/') : [];

  return { dirs };
}
