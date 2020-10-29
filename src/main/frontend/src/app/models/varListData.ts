/**
 * The information about the highlightable variable.
 */
export interface VarInfo {
  dataid: string;
  className: string;
  methodName: string;
  var: string;
  linenum: string;
  inst: String;
  count: number;
  valueList: ValueInfo[];
}

/**
 * The information about the values of variable .
 */
export interface ValueInfo {
  data: string;
  timestamp: string;
  thread: string;
}

/**
 * The all variable information in the project.
 */
export interface VarListJsonData {
  recentdata: VarInfo[];
}

/**
 * The model of project variable information
 */
export class VarListDataModel {
  private _data: VarListJsonData;

  constructor(data: VarListJsonData) {
    this._data = data;
  }

  /**
   * Return the variable information of the specified classname
   */
  getDataOfFile(file: string): VarInfo[] {
    return this._data.recentdata.filter((x) => x.className === file);
  }
}
