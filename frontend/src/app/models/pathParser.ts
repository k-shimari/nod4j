import * as Path from 'path';

export function parseFilesPath(path: string): { parentDirs: string[]; currentDir: string } {
  if (path.indexOf('/files') !== 0) {
    throw new Error('Impossible');
  }

  const relativeDir = Path.relative('files', path);
  const dirs = relativeDir ? relativeDir.split('/') : [];

  const parentDirs = dirs.length > 0 ? ['/', ...dirs.slice(0, dirs.length - 1)] : [];
  const currentDir = dirs.length > 0 ? dirs[dirs.length - 1] : '/';

  return { parentDirs, currentDir };
}
