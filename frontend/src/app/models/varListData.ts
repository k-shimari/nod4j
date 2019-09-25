export interface VarInfo {
  dataid: string;
  className: string;
  methodName: string;
  var: string;
  linenum: string;
  isPut: boolean;
  count: number;
  valueList: ValueInfo[];
}

export interface ValueInfo {
  data: string;
  timestamp: string;
  thread: string;
}

export interface VarListJsonData {
  recentdata: VarInfo[];
}

export class VarListDataModel {
  private _data: VarListJsonData;

  constructor(data: VarListJsonData) {
    this._data = data;
  }

  getDataOfFile(file: string): VarInfo[] {
    return this._data.recentdata.filter((x) => x.className === file);
  }
}
