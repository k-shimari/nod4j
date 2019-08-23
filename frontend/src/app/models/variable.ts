export interface VarInfo {
  dataid: string;
  className: string;
  methodName: string;
  var: string;
  linenum: string;
  count: number;
  valueList: ValueInfo[];
}

export interface ValueInfo {
  data: string;
  timestamp: string;
  thread: string;
}

export interface JsonData {
  data: VarInfo[];
}

export const jsonDataStr = `
{
  "data": [
    {
      "dataid": "21198",
      "className": "Main.java",
      "methodName": "<clinit>",
      "var": "intarray",
      "linenum": "7",
      "count": 1,
      "valueList": [
        { "data": "[I@5de5cac8", "timestamp": "12630", "thread": "0" }
      ]
    },
    {
      "dataid": "21229",
      "className": "Main.java",
      "methodName": "getMax",
      "var": "max",
      "linenum": "9",
      "count": 1,
      "valueList": [
        { "data": "0", "timestamp": "12637", "thread": "0" },
        { "data": "0", "timestamp": "13792", "thread": "0" },
        { "data": "0", "timestamp": "14947", "thread": "0" },
        { "data": "0", "timestamp": "16103", "thread": "0" },
        { "data": "0", "timestamp": "17259", "thread": "0" },
        { "data": "0", "timestamp": "18415", "thread": "0" }
      ]
    },
    {
      "dataid": "21231",
      "className": "Main.java",
      "methodName": "getMax",
      "var": "num1",
      "linenum": "10",
      "count": 1,
      "valueList": [
        { "data": "30", "timestamp": "12639", "thread": "0" },
        { "data": "30", "timestamp": "13794", "thread": "0" },
        { "data": "20", "timestamp": "14949", "thread": "0" },
        { "data": "20", "timestamp": "16105", "thread": "0" },
        { "data": "10", "timestamp": "17261", "thread": "0" },
        { "data": "10", "timestamp": "18417", "thread": "0" }
      ]
    },
    {
      "dataid": "21232",
      "className": "Main.java",
      "methodName": "getMax",
      "var": "num2",
      "linenum": "10",
      "count": 1,
      "valueList": [
        { "data": "10", "timestamp": "12640", "thread": "0" },
        { "data": "20", "timestamp": "13795", "thread": "0" },
        { "data": "10", "timestamp": "14950", "thread": "0" },
        { "data": "30", "timestamp": "16106", "thread": "0" },
        { "data": "20", "timestamp": "17262", "thread": "0" },
        { "data": "30", "timestamp": "18418", "thread": "0" }
      ]
    },
    {
      "dataid": "21235",
      "className": "Main.java",
      "methodName": "getMax",
      "var": "num1",
      "linenum": "11",
      "count": 1,
      "valueList": [
        { "data": "20", "timestamp": "16108", "thread": "0" },
        { "data": "10", "timestamp": "17264", "thread": "0" },
        { "data": "10", "timestamp": "18420", "thread": "0" }
      ]
    },
    {
      "dataid": "21236",
      "className": "Main.java",
      "methodName": "getMax",
      "var": "num3",
      "linenum": "11",
      "count": 1,
      "valueList": [
        { "data": "10", "timestamp": "16109", "thread": "0" },
        { "data": "30", "timestamp": "17265", "thread": "0" },
        { "data": "20", "timestamp": "18421", "thread": "0" }
      ]
    },
    {
      "dataid": "21239",
      "className": "Main.java",
      "methodName": "getMax",
      "var": "num3",
      "linenum": "12",
      "count": 1,
      "valueList": [
        { "data": "30", "timestamp": "17267", "thread": "0" },
        { "data": "20", "timestamp": "18423", "thread": "0" }
      ]
    },
    {
      "dataid": "21240",
      "className": "Main.java",
      "methodName": "getMax",
      "var": "max",
      "linenum": "12",
      "count": 1,
      "valueList": [
        { "data": "30", "timestamp": "17268", "thread": "0" },
        { "data": "20", "timestamp": "18424", "thread": "0" }
      ]
    },
    {
      "dataid": "21244",
      "className": "Main.java",
      "methodName": "getMax",
      "var": "num2",
      "linenum": "14",
      "count": 1,
      "valueList": [{ "data": "30", "timestamp": "16111", "thread": "0" }]
    },
    {
      "dataid": "21245",
      "className": "Main.java",
      "methodName": "getMax",
      "var": "max",
      "linenum": "14",
      "count": 1,
      "valueList": [{ "data": "30", "timestamp": "16112", "thread": "0" }]
    },
    {
      "dataid": "21249",
      "className": "Main.java",
      "methodName": "getMax",
      "var": "num1",
      "linenum": "17",
      "count": 1,
      "valueList": [
        { "data": "30", "timestamp": "12642", "thread": "0" },
        { "data": "30", "timestamp": "13797", "thread": "0" },
        { "data": "20", "timestamp": "14952", "thread": "0" }
      ]
    },
    {
      "dataid": "21250",
      "className": "Main.java",
      "methodName": "getMax",
      "var": "num3",
      "linenum": "17",
      "count": 1,
      "valueList": [
        { "data": "20", "timestamp": "12643", "thread": "0" },
        { "data": "10", "timestamp": "13798", "thread": "0" },
        { "data": "30", "timestamp": "14953", "thread": "0" }
      ]
    },
    {
      "dataid": "21253",
      "className": "Main.java",
      "methodName": "getMax",
      "var": "num3",
      "linenum": "18",
      "count": 1,
      "valueList": [{ "data": "30", "timestamp": "14955", "thread": "0" }]
    },
    {
      "dataid": "21254",
      "className": "Main.java",
      "methodName": "getMax",
      "var": "max",
      "linenum": "18",
      "count": 1,
      "valueList": [{ "data": "30", "timestamp": "14956", "thread": "0" }]
    },
    {
      "dataid": "21258",
      "className": "Main.java",
      "methodName": "getMax",
      "var": "num1",
      "linenum": "20",
      "count": 1,
      "valueList": [
        { "data": "30", "timestamp": "12645", "thread": "0" },
        { "data": "30", "timestamp": "13800", "thread": "0" }
      ]
    },
    {
      "dataid": "21259",
      "className": "Main.java",
      "methodName": "getMax",
      "var": "max",
      "linenum": "20",
      "count": 1,
      "valueList": [
        { "data": "30", "timestamp": "12646", "thread": "0" },
        { "data": "30", "timestamp": "13801", "thread": "0" }
      ]
    },
    {
      "dataid": "21261",
      "className": "Main.java",
      "methodName": "getMax",
      "var": "i",
      "linenum": "23",
      "count": 2,
      "valueList": [
        { "data": "0", "timestamp": "12648", "thread": "0" },
        { "data": "0", "timestamp": "13803", "thread": "0" },
        { "data": "0", "timestamp": "14959", "thread": "0" },
        { "data": "0", "timestamp": "16115", "thread": "0" },
        { "data": "0", "timestamp": "17271", "thread": "0" },
        { "data": "0", "timestamp": "18427", "thread": "0" }
      ]
    },
    {
      "dataid": "21265",
      "className": "Main.java",
      "methodName": "getMax",
      "var": "intarray",
      "linenum": "24",
      "count": 1,
      "valueList": [
        { "data": "[I@5de5cac8", "timestamp": "19180", "thread": "0" },
        { "data": "[I@5de5cac8", "timestamp": "19191", "thread": "0" },
        { "data": "[I@5de5cac8", "timestamp": "19202", "thread": "0" },
        { "data": "[I@5de5cac8", "timestamp": "19213", "thread": "0" },
        { "data": "[I@5de5cac8", "timestamp": "19224", "thread": "0" },
        { "data": "[I@5de5cac8", "timestamp": "19235", "thread": "0" },
        { "data": "[I@5de5cac8", "timestamp": "19246", "thread": "0" },
        { "data": "[I@5de5cac8", "timestamp": "19257", "thread": "0" },
        { "data": "[I@5de5cac8", "timestamp": "19268", "thread": "0" },
        { "data": "[I@5de5cac8", "timestamp": "19279", "thread": "0" },
        { "data": "[I@5de5cac8", "timestamp": "19290", "thread": "0" },
        { "data": "[I@5de5cac8", "timestamp": "19301", "thread": "0" },
        { "data": "[I@5de5cac8", "timestamp": "19312", "thread": "0" },
        { "data": "[I@5de5cac8", "timestamp": "19323", "thread": "0" },
        { "data": "[I@5de5cac8", "timestamp": "19334", "thread": "0" },
        { "data": "[I@5de5cac8", "timestamp": "19345", "thread": "0" },
        { "data": "[I@5de5cac8", "timestamp": "19356", "thread": "0" },
        { "data": "[I@5de5cac8", "timestamp": "19367", "thread": "0" },
        { "data": "[I@5de5cac8", "timestamp": "19378", "thread": "0" },
        { "data": "[I@5de5cac8", "timestamp": "19389", "thread": "0" },
        { "data": "[I@5de5cac8", "timestamp": "19400", "thread": "0" },
        { "data": "[I@5de5cac8", "timestamp": "19411", "thread": "0" },
        { "data": "[I@5de5cac8", "timestamp": "19422", "thread": "0" },
        { "data": "[I@5de5cac8", "timestamp": "19433", "thread": "0" },
        { "data": "[I@5de5cac8", "timestamp": "19444", "thread": "0" },
        { "data": "[I@5de5cac8", "timestamp": "19455", "thread": "0" },
        { "data": "[I@5de5cac8", "timestamp": "19466", "thread": "0" },
        { "data": "[I@5de5cac8", "timestamp": "19477", "thread": "0" },
        { "data": "[I@5de5cac8", "timestamp": "19488", "thread": "0" },
        { "data": "[I@5de5cac8", "timestamp": "19499", "thread": "0" },
        { "data": "[I@5de5cac8", "timestamp": "19510", "thread": "0" },
        { "data": "[I@5de5cac8", "timestamp": "19521", "thread": "0" }
      ]
    },
    {
      "dataid": "21266",
      "className": "Main.java",
      "methodName": "getMax",
      "var": "i",
      "linenum": "24",
      "count": 1,
      "valueList": [
        { "data": "68", "timestamp": "19181", "thread": "0" },
        { "data": "69", "timestamp": "19192", "thread": "0" },
        { "data": "70", "timestamp": "19203", "thread": "0" },
        { "data": "71", "timestamp": "19214", "thread": "0" },
        { "data": "72", "timestamp": "19225", "thread": "0" },
        { "data": "73", "timestamp": "19236", "thread": "0" },
        { "data": "74", "timestamp": "19247", "thread": "0" },
        { "data": "75", "timestamp": "19258", "thread": "0" },
        { "data": "76", "timestamp": "19269", "thread": "0" },
        { "data": "77", "timestamp": "19280", "thread": "0" },
        { "data": "78", "timestamp": "19291", "thread": "0" },
        { "data": "79", "timestamp": "19302", "thread": "0" },
        { "data": "80", "timestamp": "19313", "thread": "0" },
        { "data": "81", "timestamp": "19324", "thread": "0" },
        { "data": "82", "timestamp": "19335", "thread": "0" },
        { "data": "83", "timestamp": "19346", "thread": "0" },
        { "data": "84", "timestamp": "19357", "thread": "0" },
        { "data": "85", "timestamp": "19368", "thread": "0" },
        { "data": "86", "timestamp": "19379", "thread": "0" },
        { "data": "87", "timestamp": "19390", "thread": "0" },
        { "data": "88", "timestamp": "19401", "thread": "0" },
        { "data": "89", "timestamp": "19412", "thread": "0" },
        { "data": "90", "timestamp": "19423", "thread": "0" },
        { "data": "91", "timestamp": "19434", "thread": "0" },
        { "data": "92", "timestamp": "19445", "thread": "0" },
        { "data": "93", "timestamp": "19456", "thread": "0" },
        { "data": "94", "timestamp": "19467", "thread": "0" },
        { "data": "95", "timestamp": "19478", "thread": "0" },
        { "data": "96", "timestamp": "19489", "thread": "0" },
        { "data": "97", "timestamp": "19500", "thread": "0" },
        { "data": "98", "timestamp": "19511", "thread": "0" },
        { "data": "99", "timestamp": "19522", "thread": "0" }
      ]
    },
    {
      "dataid": "21267",
      "className": "Main.java",
      "methodName": "getMax",
      "var": "max",
      "linenum": "24",
      "count": 1,
      "valueList": [
        { "data": "20", "timestamp": "19182", "thread": "0" },
        { "data": "20", "timestamp": "19193", "thread": "0" },
        { "data": "20", "timestamp": "19204", "thread": "0" },
        { "data": "20", "timestamp": "19215", "thread": "0" },
        { "data": "20", "timestamp": "19226", "thread": "0" },
        { "data": "20", "timestamp": "19237", "thread": "0" },
        { "data": "20", "timestamp": "19248", "thread": "0" },
        { "data": "20", "timestamp": "19259", "thread": "0" },
        { "data": "20", "timestamp": "19270", "thread": "0" },
        { "data": "20", "timestamp": "19281", "thread": "0" },
        { "data": "20", "timestamp": "19292", "thread": "0" },
        { "data": "20", "timestamp": "19303", "thread": "0" },
        { "data": "20", "timestamp": "19314", "thread": "0" },
        { "data": "20", "timestamp": "19325", "thread": "0" },
        { "data": "20", "timestamp": "19336", "thread": "0" },
        { "data": "20", "timestamp": "19347", "thread": "0" },
        { "data": "20", "timestamp": "19358", "thread": "0" },
        { "data": "20", "timestamp": "19369", "thread": "0" },
        { "data": "20", "timestamp": "19380", "thread": "0" },
        { "data": "20", "timestamp": "19391", "thread": "0" },
        { "data": "20", "timestamp": "19402", "thread": "0" },
        { "data": "20", "timestamp": "19413", "thread": "0" },
        { "data": "20", "timestamp": "19424", "thread": "0" },
        { "data": "20", "timestamp": "19435", "thread": "0" },
        { "data": "20", "timestamp": "19446", "thread": "0" },
        { "data": "20", "timestamp": "19457", "thread": "0" },
        { "data": "20", "timestamp": "19468", "thread": "0" },
        { "data": "20", "timestamp": "19479", "thread": "0" },
        { "data": "20", "timestamp": "19490", "thread": "0" },
        { "data": "20", "timestamp": "19501", "thread": "0" },
        { "data": "20", "timestamp": "19512", "thread": "0" },
        { "data": "20", "timestamp": "19523", "thread": "0" }
      ]
    },
    {
      "dataid": "21274",
      "className": "Main.java",
      "methodName": "getMax",
      "var": "i",
      "linenum": "23",
      "count": 1,
      "valueList": [
        { "data": "69", "timestamp": "19189", "thread": "0" },
        { "data": "70", "timestamp": "19200", "thread": "0" },
        { "data": "71", "timestamp": "19211", "thread": "0" },
        { "data": "72", "timestamp": "19222", "thread": "0" },
        { "data": "73", "timestamp": "19233", "thread": "0" },
        { "data": "74", "timestamp": "19244", "thread": "0" },
        { "data": "75", "timestamp": "19255", "thread": "0" },
        { "data": "76", "timestamp": "19266", "thread": "0" },
        { "data": "77", "timestamp": "19277", "thread": "0" },
        { "data": "78", "timestamp": "19288", "thread": "0" },
        { "data": "79", "timestamp": "19299", "thread": "0" },
        { "data": "80", "timestamp": "19310", "thread": "0" },
        { "data": "81", "timestamp": "19321", "thread": "0" },
        { "data": "82", "timestamp": "19332", "thread": "0" },
        { "data": "83", "timestamp": "19343", "thread": "0" },
        { "data": "84", "timestamp": "19354", "thread": "0" },
        { "data": "85", "timestamp": "19365", "thread": "0" },
        { "data": "86", "timestamp": "19376", "thread": "0" },
        { "data": "87", "timestamp": "19387", "thread": "0" },
        { "data": "88", "timestamp": "19398", "thread": "0" },
        { "data": "89", "timestamp": "19409", "thread": "0" },
        { "data": "90", "timestamp": "19420", "thread": "0" },
        { "data": "91", "timestamp": "19431", "thread": "0" },
        { "data": "92", "timestamp": "19442", "thread": "0" },
        { "data": "93", "timestamp": "19453", "thread": "0" },
        { "data": "94", "timestamp": "19464", "thread": "0" },
        { "data": "95", "timestamp": "19475", "thread": "0" },
        { "data": "96", "timestamp": "19486", "thread": "0" },
        { "data": "97", "timestamp": "19497", "thread": "0" },
        { "data": "98", "timestamp": "19508", "thread": "0" },
        { "data": "99", "timestamp": "19519", "thread": "0" },
        { "data": "100", "timestamp": "19530", "thread": "0" }
      ]
    },
    {
      "dataid": "21277",
      "className": "Main.java",
      "methodName": "getMax",
      "var": "max",
      "linenum": "26",
      "count": 1,
      "valueList": [
        { "data": "30", "timestamp": "13753", "thread": "0" },
        { "data": "30", "timestamp": "14908", "thread": "0" },
        { "data": "30", "timestamp": "16064", "thread": "0" },
        { "data": "30", "timestamp": "17220", "thread": "0" },
        { "data": "30", "timestamp": "18376", "thread": "0" },
        { "data": "20", "timestamp": "19532", "thread": "0" }
      ]
    }
  ]
}
`;

export const jsonData = JSON.parse(jsonDataStr) as JsonData;
