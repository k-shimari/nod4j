import { ProjectInfo } from './api';

export class ProjectManager {
  /**
   * This function returns the list of project name which contains fileinfo.json and varinfo.json in the assets/projects/{projectName}/
   */
  private async readProjects(): Promise<string[]> {
    let fileinfo: string[] = importAll(
      require.context('../../assets/project', true, /.*fileinfo.json$/)
    );
    let varinfo: string[] = importAll(
      require.context('../../assets/project', true, /.*varinfo.json$/)
    );
    fileinfo = fileinfo.map((s) => s.substr(2, s.lastIndexOf('/') - 2));
    varinfo = varinfo.map((s) => s.substr(2, s.lastIndexOf('/') - 2));
    let all: string[] = fileinfo.filter((item) => varinfo.includes(item));
    all.forEach((s) => console.log(s));

    return all;
  }

  /**
   * This fucntion returns the all project Name.
   */
  async getAllProjects(): Promise<ProjectInfo[]> {
    return (await this.readProjects()).map((name) => ({
      name
    }));
  }
}

function importAll(r: any) {
  return r.keys();
}
