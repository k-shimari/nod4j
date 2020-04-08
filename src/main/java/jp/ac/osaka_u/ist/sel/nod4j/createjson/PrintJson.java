package jp.ac.osaka_u.ist.sel.nod4j.createjson;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * This class prints the information of file and variable values in the format of JSON.
 * @author k-simari
 */
public class PrintJson {
	private String targetDir;
	private String filename;

	public PrintJson(String dir, String filename) {
		this.targetDir = dir;
		this.filename = filename;
	}

	void printJson(Object json) throws IOException {
		ObjectMapper mapper = new ObjectMapper();
		List<String> lines = new ArrayList<>();
		lines.add(mapper.writeValueAsString(json));

		if (Files.exists(Paths.get(targetDir, filename))) {
			Files.delete(Paths.get(targetDir, filename));
		}
		Files.createFile(Paths.get(targetDir, filename));
		Files.write(Paths.get(targetDir, filename), lines, StandardCharsets.UTF_8, StandardOpenOption.WRITE);
	}

	/*For Debug*/
	void printJsonForDebug(List<?> jsonList) throws IOException {
		ObjectMapper mapper = new ObjectMapper();
		List<String> lines = jsonList.stream()
				.map(s -> {
					try {
						return mapper.writeValueAsString(s);
					} catch (JsonProcessingException e) {
						e.printStackTrace();
						return "";
					}
				})
				.collect(Collectors.toList());
		if (Files.exists(Paths.get(targetDir, filename))) {
			Files.delete(Paths.get(targetDir, filename));
		}
		Files.createFile(Paths.get(targetDir, filename));
		Files.write(Paths.get(targetDir, filename), lines, StandardCharsets.UTF_8, StandardOpenOption.WRITE);
	}

}
