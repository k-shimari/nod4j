import * as JSON5 from 'json5';
import { ProjectItemDirectory, ProjectModel } from './project';
import { ProjectManager } from './projectManager';
import { VarListJsonData } from './varListData';

export interface ProjectInfo {
  name: string;
}

/**
 * Handle escaping double quotes of string, if the value is string.
 */
function receiver(key: any, value: any): any {
  if (typeof value === 'string') {
    return value.replace(/\\\"/g, '"');
  } else {
    return value;
  }
}

export class nod4jApi {
  /**
   * return the text of varinfo.json or fileinfo.json which is specified the path
   */
  private getAssetFile(path: string): Promise<string> {
    return fetch(path).then((res) => {
      return res.text();
    });
  }

  /**
   * set the absolute path to the projects
   */
  private pathBase(projectName: string) {
    return `/assets/project/${projectName}`;
  }

  /**
   * parse the json file, which contains source code information, and return the model of the project.
   */
  async fetchFileInfo(projectName: string): Promise<ProjectModel | undefined> {
    const fileInfoPath = this.pathBase(projectName) + '/fileinfo.json';
    const s: string = await this.getAssetFile(fileInfoPath);
    const projectDir = JSON5.parse(s, receiver) as ProjectItemDirectory;
    if (projectDir) {
      return new ProjectModel(projectDir);
    } else {
      return undefined;
    }
  }

  /**
   * parse and return the json, which contains the values of variable information
   */
  async fetchVarInfo(projectName: string): Promise<VarListJsonData> {
    const varInfoPath = this.pathBase(projectName) + '/varinfo.json';
    const s: string = await this.getAssetFile(varInfoPath);
    const json = JSON5.parse(s, receiver) as VarListJsonData;
    return json;
  }
}
