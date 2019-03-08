package data;

import java.util.ArrayList;

public class Values{
	private ArrayList<Value> values;

	public Values(ArrayList<Value> values) {
		this.values = values;
	}

	public ArrayList<Value> getValues() {
		return values;
	}

	public void setValues(ArrayList<Value> values) {
		this.values = values;
	}



	public class Value {
		private String value;

		public Value(String value) {
			this.value = value;
		}

		public String getValue() {
			return value;
		}

		public void setValue(String value) {
			this.value = value;
		}
	}

}
