package com.omquark.bof2editor.config;

import com.omquark.bof2editor.Logger.Logger;
import lombok.AccessLevel;
import lombok.Getter;
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
    private static final String PATH_DELIMITER = "\\";

    private Logger.LogLevel logLevel;
    private int backEndPort;

    private String backEndHost;

    private int frontEndPort;
    private String frontEndHost;

    @Getter(AccessLevel.NONE)
    @Setter(AccessLevel.NONE)
    private Properties props = new Properties();

    public static final Config config;

    static {
        config = new Config();
    }

    public Config(){
        if(config != null){
            Logger.writeToLog(Logger.LogLevel.INFO, "Attempted to init while already defined! I will not re-init.");
            return;
        }

        init();
    }

    public void init(){

        String reader;

        String propsFile = DEFAULT_CONFIG_PATH + PATH_DELIMITER + DEFAULT_CONFIG_FILE;

        try (FileReader fr = new FileReader(propsFile)){
            props.load(fr);
        } catch (IOException e){
            Logger.writeToLog(Logger.LogLevel.ERROR, "I met an error attempting to read the props file! I will try to continue with the default props.");
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
