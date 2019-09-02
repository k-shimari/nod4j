package createjson;

import java.util.ArrayList;
import java.util.List;

import data.Json;
import data.SeloggerFiles;

public class CreateStructure implements ICreateJson {
	private SeloggerFiles selfiles;

	public CreateStructure(SeloggerFiles selfiles) {
		this.selfiles = selfiles;
	}

	@Override
	public List<Json> create() {
		List<Json> jsonList = new ArrayList<>();

		return jsonList;
	}
}
