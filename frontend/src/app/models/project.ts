export type ProjectItemKind = 'file' | 'dir';

export interface ProjectItem {
  name: string;
  author: string;
  lastModifiedDate: Date;
  kind: ProjectItemKind;
}

export class ProjectModel {
  /**
   * プロジェクト中のディレクトリのアイテムを返します
   * @param dir このディレクトリのアイテムを返します
   */
  getItems(dir: string): ProjectItem[] {
    // FIXME: どのディレクトリでも同じファイルを返す実装になっています
    return [
      { name: 'package.json', author: 'naoto', lastModifiedDate: new Date(), kind: 'file' },
      { name: '.gitignore', author: 'naoto', lastModifiedDate: new Date(), kind: 'file' },
      { name: 'node_modules', author: 'naoto', lastModifiedDate: new Date(), kind: 'dir' }
    ];
  }
}
