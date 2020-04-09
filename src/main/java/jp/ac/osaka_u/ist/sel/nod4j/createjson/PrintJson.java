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
	private String outputDir;
	private String filename;

	public PrintJson(String dir, String filename) {
		this.outputDir = dir;
		this.filename = filename;
	}

	void printJson(Object json) throws IOException {
		ObjectMapper mapper = new ObjectMapper();
		List<String> lines = new ArrayList<>();
		lines.add(mapper.writeValueAsString(json));
		if (Files.exists(Paths.get(outputDir))) {
			Files.deleteIfExists(Paths.get(outputDir, filename));
		} else {
			Files.createDirectory(Paths.get(outputDir));
		}
		Files.createFile(Paths.get(outputDir, filename));
		Files.write(Paths.get(outputDir, filename), lines, StandardCharsets.UTF_8, StandardOpenOption.WRITE);
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
		if (Files.exists(Paths.get(outputDir, filename))) {
			Files.delete(Paths.get(outputDir, filename));
		}
		Files.createFile(Paths.get(outputDir, filename));
		Files.write(Paths.get(outputDir, filename), lines, StandardCharsets.UTF_8, StandardOpenOption.WRITE);
	}

}
