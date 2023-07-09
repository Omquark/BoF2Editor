package com.omquark.BoF2Editor;

import com.omquark.BoF2Editor.Logger.Logger;
import com.omquark.BoF2Editor.config.Config;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Collections;
import java.util.HashMap;

@SpringBootApplication
public class BoF2EditorApplication {


	public static void main(String[] args) {
		new Config();
		HashMap<String, Object> serverOptions;

		Config.report();
		serverOptions = new HashMap<>();
		serverOptions.put("server.port", Config.config.getBackEndPort());
		serverOptions.put("server.address", Config.config.getFrontEndHost());

		Logger.writeToLog(Logger.LogLevel.INFO, "Using the following values for override on the config");
		serverOptions.forEach((k, v) -> Logger.writeToLog(Logger.LogLevel.INFO, k + "=" + v));

		SpringApplication app = new SpringApplication(BoF2EditorApplication.class);
		app.setDefaultProperties(Collections
				.synchronizedMap(serverOptions)
		);

		app.run();
	}
}
