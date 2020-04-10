import * as JSON5 from 'json5';
import { ProjectItemDirectory, ProjectModel } from './project';
import { ProjectManager } from './projectManager';
import { rawProjectJsonData } from './rawProjectData';
import { rawVarListData } from './rawVarListData';
import { VarListJsonData } from './varListData';

export interface ProjectInfo {
  name: string;
}

function receiver(key: any, value: any): any {
  // To handle escaping double quotes
  // See: https://github.com/k-shimari/nod4j/issues/97
  if (typeof value === 'string') {
    return value.replace(/\\\"/g, '"');
  } else {
    return value;
  }
}

export class nod4jApi {
  private getAssetFile(path: string): Promise<string> {
    return fetch(path).then((res) => {
      return res.text();
    });
  }

  private pathBase(projectName: string) {
    return `/assets/project/${projectName}`;
  }

  async fetchFileInfo(projectName: string): Promise<ProjectModel | undefined> {
    const fileInfoPath = this.pathBase(projectName) + '/fileinfo.json';

    const s: string = await (projectName === 'demo'
      ? Promise.resolve(rawProjectJsonData)
      : this.getAssetFile(fileInfoPath));

    const projectDir = JSON5.parse(s, receiver) as ProjectItemDirectory;

    if (projectDir) {
      return new ProjectModel(projectDir);
    } else {
      return undefined;
    }
  }

  async fetchVarInfo(projectName: string): Promise<VarListJsonData> {
    const varInfoPath = this.pathBase(projectName) + '/varinfo.json';

    const s: string = await (projectName === 'demo'
      ? Promise.resolve(rawVarListData)
      : this.getAssetFile(varInfoPath));

    const json = JSON5.parse(s, receiver) as VarListJsonData;

    return json;
  }

  async fetchProjects(): Promise<ProjectInfo[]> {
    const manager = new ProjectManager();
    const projects = await manager.getAllProjects();
    return projects;
  }
}
