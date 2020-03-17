import * as LF from 'localforage';
import { extendPrototype } from 'localforage-observable';
import { ProjectInfo } from './api';
let localforage = extendPrototype(LF);

export class ProjectManager {
  private static projectsKey = 'nod3v.projects';
  private async readProjects(): Promise<string[]> {
    return (await localforage.getItem<string[]>(ProjectManager.projectsKey)) || [];
  }

  async addProject(project: ProjectInfo): Promise<boolean> {
    const projects = await this.readProjects();

    if (projects.indexOf(project.name) === -1) {
      projects.push(project.name);
      await localforage.setItem(ProjectManager.projectsKey, projects);
      return true;
    } else {
      return false;
    }
  }

  async removeProject(project: ProjectInfo): Promise<boolean> {
    const projects = await this.readProjects();

    const index = projects.indexOf(project.name);

    if (index >= 0) {
      const newProjects = [...projects.slice(0, index), ...projects.slice(index + 1)];
      await localforage.setItem(ProjectManager.projectsKey, newProjects);
      return true;
    } else {
      return false;
    }
  }

  async getAllProjects(): Promise<ProjectInfo[]> {
    return (await this.readProjects()).map((name) => ({
      name
    }));
  }
}
