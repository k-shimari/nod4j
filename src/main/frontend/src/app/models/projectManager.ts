import { ProjectInfo } from './api';

export class ProjectManager {
   private async readProjects(): Promise<string[]> {
    let fileinfo: string[] = importAll(require.context('../../assets/project', true, /.*fileinfo.json$/));
    let varinfo: string[] = importAll(require.context('../../assets/project', true, /.*varinfo.json$/));
    fileinfo= fileinfo.map((s) => s.substr(2, s.lastIndexOf('/') - 2));
    varinfo= varinfo.map((s) => s.substr(2, s.lastIndexOf('/') - 2));
    let all : string[]= fileinfo.filter((item) => varinfo.includes(item))
    all.forEach((s) => console.log(s));

    return all;
  }
  async getAllProjects(): Promise<ProjectInfo[]> {
    return (await this.readProjects()).map((name) => ({
      name
    }));
  }

}

function importAll(r: any) {
  console.log(r);
  return r.keys();
}
