package com.omquark.BoF2Editor.config;

import com.omquark.BoF2Editor.Logger.Logger;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.context.annotation.Configuration;

import java.io.FileReader;
import java.io.IOException;
import java.util.Properties;

@Configuration
@Getter
@Setter
public class Config {

    //Declare global default configuration
    public static final String DEFAULT_CONFIG_PATH = "Z:\\Coding Projects\\BoF2Editor\\server\\config";

    public static final String DEFAULT_CONFIG_FILE = "config.prop";
    public static final String LOGGING_LEVEL_DEFAULT = "DEBUG";
    public static final String BACK_END_PORT_DEFAULT = "6000";
    public static final String BACK_END_HOST_DEFAULT = "localhost";

    public static final String FRONT_END_PORT_DEFAULT = "7000";
    public static final String FRONT_END_HOST_DEFAULT = "localhost";

    @Getter(AccessLevel.NONE)
    @Setter(AccessLevel.NONE)
    private final String PATH_DELIMITER = "\\";

    private Logger.LogLevel logLevel;
    private int backEndPort;

    private String backEndHost;

    private int frontEndPort;
    private String frontEndHost;

    @Getter(AccessLevel.NONE)
    @Setter(AccessLevel.NONE)
    private Properties props = new Properties();

    public static Config config = null;

    public Config(){
        init();
    }

    public void init(){
        if(config != null){
            Logger.writeToLog(Logger.LogLevel.INFO, "Attempted to init while already defined! I will not re-init.");
            return;
        }

        String reader;

        config = this;

        try {
            String propsFile = DEFAULT_CONFIG_PATH + PATH_DELIMITER + DEFAULT_CONFIG_FILE;
            props.load(new FileReader(propsFile));
        } catch (IOException e){
            Logger.writeToLog(Logger.LogLevel.ERROR, "Unable to read file! Will attempt to continue using default props.");
        }

        reader = (String) props.getOrDefault("backEndPort", BACK_END_PORT_DEFAULT);
        setBackEndPort(Integer.parseInt(reader));

        reader = (String) props.getOrDefault("backEndHost", BACK_END_HOST_DEFAULT);
        setBackEndHost(reader);

        reader = (String) props.getOrDefault("frontEndPort", FRONT_END_PORT_DEFAULT);
        setFrontEndPort(Integer.parseInt(reader));

        reader = (String) props.getOrDefault("frontEndHost", FRONT_END_HOST_DEFAULT);
        setFrontEndHost(reader);

        reader = (String) props.getOrDefault("loggingLevel", LOGGING_LEVEL_DEFAULT);
        Logger.setLoggingLevel(reader);
    }

    public static void report(){
        Logger.writeToLog(Logger.LogLevel.INFO,
                       "Showing used props:",
                            "backEndPort=" + config.getBackEndPort(),
                            "backEndHost=" + config.getBackEndHost(),
                            "frontEndPort=" + config.getFrontEndPort(),
                            "frontEndHost=" + config.getFrontEndHost()
                );
    }
}
