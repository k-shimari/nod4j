import * as JSON5 from 'json5';
import { ProjectItemDirectory, ProjectModel } from './project';
import { rawProjectJsonData } from './rawProjectData';
import { rawVarListData } from './rawVarListData';
import { VarListJsonData } from './varListData';

export class LogvisApi {
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

    const projectDir = JSON5.parse(s) as ProjectItemDirectory;

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

    const json = JSON5.parse(s) as VarListJsonData;

    return json;
  }
}
