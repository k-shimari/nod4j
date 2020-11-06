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

	/**
	 * The name of the output directory of the json file.
	 */
	private String outputDir;

	/**
	 * The name of the output json file (varinfo.json or fileinfo.json).
	 */
	private String filename;

	public PrintJson(String dir, String filename) {
		this.outputDir = dir;
		this.filename = filename;
	}

	/**
	 * This method converts json object in the string fomrat.
	 * Checking the output directory to output correctly, this method writes the json information to the file (fileinfo.json or varinfo.json).
	 * */
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

	/**
	 * This method is almost same as print json　method, but for debugging the json mapper.
	 * If there is an error in processing the lines, this methods outputs the stack trace.
	 * */
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
