import { Directory } from 'app/actions';

export namespace UrlParser {
  export function matchDirOfProjectUrl(url: string): Directory {
    const regex = /^\/project\/[0-9A-Za-z_-]+\/files\/?(.*)/;
    const m = url.match(regex);
    if (m === null) {
      throw new Error('Parse error: ' + url);
    } else {
      const [, dirs] = m;
      const r = dirs === '' ? [] : dirs.split('/');
      return r;
    }
  }

  export function matchDirAndFileOfViewUrl(url: string): { dirs: Directory; file: string } {
    const regex = /^\/project\/[0-9A-Za-z_-]+\/view\/?(.*)\/([^\/]+)$/;
    const m = url.match(regex);
    if (m === null) {
      throw new Error('Parse error: ' + url);
    } else {
      const [, dirs, file] = m;
      // console.log(dirs, file);
      const r = dirs === '' ? [] : dirs.split('/');
      return { dirs: r, file };
    }
  }

  export function matchDirAndFileOfLogsUrl(url: string): { dirs: Directory; file: string } {
    const regex = /^\/project\/[0-9A-Za-z_-]+\/logs\/?(.*)\/([^\/]+)$/;
    const m = url.match(regex);
    if (m === null) {
      throw new Error('Parse error: ' + url);
    } else {
      const [, dirs, file] = m;
      // console.log(dirs, file);
      const r = dirs === '' ? [] : dirs.split('/');
      return { dirs: r, file };
    }
  }


}
