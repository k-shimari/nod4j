package data;


public class Bytecodes {
	private Bytecode[] bytecodes;

	public Bytecodes(Bytecode[] bytecodes) {
		this.bytecodes = bytecodes;
	}

	public Bytecode[] getBytecodes() {
		return bytecodes;
	}

	public void setBytecodes(Bytecode[] bytecodes) {
		this.bytecodes = bytecodes;
	}

	public class Bytecode {
		private Instruction inst;
		private OwnerName owner;
		private FieldName fieldname;
		private FieldType type;
		private Values values;

		public Bytecode(Instruction inst, OwnerName owner, FieldName fieldname, FieldType type, Values values) {
			this.inst = inst;
			this.owner = owner;
			this.fieldname = fieldname;
			this.type = type;
			this.values = values;
		}

		public Instruction getInst() {
			return inst;
		}

		public void setInst(Instruction inst) {
			this.inst = inst;
		}

		public OwnerName getOwner() {
			return owner;
		}

		public void setOwner(OwnerName owner) {
			this.owner = owner;
		}

		public FieldName getFieldname() {
			return fieldname;
		}

		public void setFieldname(FieldName fieldname) {
			this.fieldname = fieldname;
		}

		public FieldType getType() {
			return type;
		}

		public void setType(FieldType type) {
			this.type = type;
		}

		public Values getValues() {
			return values;
		}

		public void setValues(Values values) {
			this.values = values;
		}

	}

}
