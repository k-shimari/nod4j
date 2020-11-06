package jp.ac.osaka_u.ist.sel.nod4j.data.varinfo;

/**
 * Set variable information(fieldname, assignment or reference, whether recorded correctly )
 * @author k-simari
 *
 */
public class VarInfo {
	/**
	 * fieldname is the variable name
	 */
	private String fieldname;
	/**
	 * variable instruciton (assignment or reference)
	 */
	private String inst;
	/**
	 * the flag of the correctness of VarInfo.
	 */
	private boolean isFail;

	/**
	 *  length of "FIELDNAME=", "PARAMNAME=", "NAME=".
	 */
	private static final int FIELDNAMEINDEX = 10;
	private static final int PARAMNAMEINDEX = 10;
	private static final int NAMEINDEX = 5;

	/**
	 * The instruction for unvisualized instruction
	 */
	private static final String CALLRETURN = "_ReturnValue";
	private static final String ARRAYLENGTH = "_ArrayLength";
	private static final String ARRAYLOAD = "_ArrayLoad";
	private static final String ARRAYSTORE = "_ArrayStore";

	public VarInfo(String fieldname, String inst, boolean isFail) {
		this.fieldname = fieldname;
		this.inst = inst;
		this.isFail = isFail;
	}

	/**
	 * This method extracts the information about fieldname, inst and isFail.
	 * @param elemdat is the parsing result of "dataids.txt"
	 */
	public VarInfo(String[] elemdat) {
		switch (elemdat[5]) {
		case "GET_STATIC_FIELD":
		case "PUT_STATIC_FIELD":
			this.fieldname = elemdat[8].substring(FIELDNAMEINDEX);
			this.inst = elemdat[5].equals("PUT_STATIC_FIELD") ? "P" : "G";
			this.isFail = false;
			break;
		case "GET_INSTANCE_FIELD_RESULT":
		case "PUT_INSTANCE_FIELD_VALUE":
			this.fieldname = elemdat[9].substring(FIELDNAMEINDEX);
			this.inst = elemdat[5].equals("PUT_INSTANCE_FIELD_VALUE") ? "P" : "G";
			this.isFail = false;
			break;
		case "LOCAL_STORE":
		case "LOCAL_LOAD":
			this.fieldname = elemdat[8].substring(NAMEINDEX);
			this.inst = elemdat[5].equals("LOCAL_STORE") ? "P" : "G";
			/* If the variable name (unavailable) is got, it fails. (The specification of SELogger) */
			this.isFail = fieldname.equals("(Unavailable)");
			break;
		case "LOCAL_INCREMENT":
			/* TODO when var=var+1, the recorded instruction is one. */
			this.fieldname = elemdat[9].substring(NAMEINDEX);
			this.inst = "I";
			/* If the variable name (unavailable) is got, it fails. (The specification of SELogger) */
			this.isFail = fieldname.equals("(Unavailable)");
			break;
		case "METHOD_PARAM":
			if (elemdat[6].startsWith("ParamName=")) {
				/* use value processed in MethodParam.java */
				this.fieldname = elemdat[6].substring(PARAMNAMEINDEX);
				this.inst = "G";
				this.isFail = false;
			} else {
				/* If no instruction contains, it fails. */
				this.fieldname = "";
				this.inst = "";
				this.isFail = true;
			}
			break;
		/* The following cases are not for view but for logs */
		case "ARRAY_LOAD_RESULT":
			this.fieldname = ARRAYLOAD;
			this.inst = "G";
			this.isFail = false;
			break;
		case "ARRAY_STORE_VALUE":
			this.fieldname = ARRAYSTORE;
			this.inst = "P";
			this.isFail = false;
			break;
		case "ARRAY_LENGTH_RESULT":
			this.fieldname = ARRAYLENGTH;
			this.inst = "G";
			this.isFail = false;
			break;
		case "CALL_RETURN":
			this.fieldname = CALLRETURN;
			this.inst = "G";
			this.isFail = false;
			break;
		default:
			/* If no instruction contains, it fails. */
			this.fieldname = "";
			this.inst = "";
			this.isFail = true;
		}
	}

	public String getFieldname() {
		return fieldname;
	}

	public String getInst() {
		return inst;
	}

	public boolean getisFail() {
		return isFail;
	}

}
