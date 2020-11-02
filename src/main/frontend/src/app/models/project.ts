export type ProjectItemType = 'file' | 'dir';

export interface ProjectItemBase {
  type: ProjectItemType;
  name: string;
}

/**
 * Define the file in the fileTable View.
 * Content means source code in the file.
 */

export interface ProjectItemFile extends ProjectItemBase {
  type: 'file';
  content: string[];
}

export namespace ProjectItemFile {
  export function create(name: string, content: string[]): ProjectItemFile {
    return {
      type: 'file',
      name,
      content
    };
  }
}

export class ProjectItemFileModel implements ProjectItemFile {
  get type() {
    return this._file.type;
  }
  get name() {
    return this._file.name;
  }
  get content() {
    return this._file.content;
  }
  get joinedContent() {
    return this._file.content.join('\n');
  }

  private _file: ProjectItemFile;

  constructor(file: ProjectItemFile) {
    this._file = file;
  }
}

/**
 * Define the directory in the fileTable View.
 * childeren means the array of file or directory.
 */
export interface ProjectItemDirectory extends ProjectItemBase {
  type: 'dir';
  children: ProjectItem[];
}

export namespace ProjectItemDirectory {
  export function create(name: string, children: ProjectItem[]): ProjectItemDirectory {
    return {
      type: 'dir',
      name,
      children
    };
  }
}

export class ProjectItemDirectoryModel implements ProjectItemDirectory {
  get type() {
    return this._dir.type;
  }
  get name() {
    return this._dir.name;
  }
  get children() {
    return this._dir.children.map((x) => {
      if (x.type === 'file') {
        return new ProjectItemFileModel(x);
      } else {
        return new ProjectItemDirectoryModel(x);
      }
    });
  }

  private _dir: ProjectItemDirectory;
  constructor(dir: ProjectItemDirectory) {
    this._dir = dir;
  }

  /**
   * @param fileName
   * This function searches the file which contains the source code or undefined (no file).
   */
  findFile(fileName: string): ProjectItemFile | undefined {
    return this._dir.children.find<ProjectItemFile>(
      (x): x is ProjectItemFile => x.type === 'file' && x.name === fileName
    );
  }

  /**
   * @param dirName
   * This function searches the directory model whose directory contains the files and directories.
   */
  findDir(dirName: string): ProjectItemDirectoryModel | undefined {
    const dir = this._dir.children.find<ProjectItemDirectory>(
      (x): x is ProjectItemDirectory => x.type === 'dir' && x.name === dirName
    );
    return dir ? new ProjectItemDirectoryModel(dir) : undefined;
  }

   /**
   * @param targetDirs the array of directory which leads to target directry.
   * This function returns the instance of this class if the target directroy path exists.
   */
  recursiveFindDir(targetDirs: string[]): ProjectItemDirectoryModel | undefined {
    if (targetDirs.length === 0) {
      return this;
    } else {
      const childDir = this.findDir(targetDirs[0]);
      if (childDir) {
        return childDir.recursiveFindDir(targetDirs.slice(1));
      } else {
        return undefined;
      }
    }
  }
}

export type ProjectItem = ProjectItemFile | ProjectItemDirectory;
export type ProjectItemModel = ProjectItemFile | ProjectItemDirectoryModel;

export class ProjectModel {
  private _rootDir: ProjectItemDirectoryModel;

  constructor(rootDir: ProjectItemDirectory) {
    this._rootDir = new ProjectItemDirectoryModel(rootDir);
  }

  /**
   * @param dirs
   * This function returns the contents (file and direcoty) of the specified directory.
   */
  getItems(dirs: string[]): ProjectItemModel[] {
    const targetDir = this._rootDir.recursiveFindDir(dirs);
    if (targetDir) {
      return targetDir.children;
    } else {
      return [];
    }
  }
}
