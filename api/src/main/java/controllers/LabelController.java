package controllers;

//import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.FileWriter;

@RestController
public class LabelController {
	@RequestMapping("/api/save")
	public void saveResults(@RequestParam(value = "result") String result, 
			@RequestParam(value = "filename") String filename) throws Exception {
		System.out.println(filename);
		FileWriter writer = new FileWriter(filename);
		writer.write(result);
		writer.close();
	}
}
