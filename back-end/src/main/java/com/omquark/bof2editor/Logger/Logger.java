package com.omquark.bof2editor.Logger;

import lombok.Getter;
import lombok.Setter;

import java.io.PrintStream;
import java.sql.Time;
import java.time.Instant;
import java.util.Arrays;
import java.util.Date;

public class Logger {

    public enum LogLevel{
        DEBUG ("DEBUG", 0),
        INFO ("INFO", 1),
        WARN ("WARN", 2),
        //Errors cannot be suppressed
        ERROR ("ERROR", 255);

        @Getter @Setter
        private final String levelMessage;
        @Getter @Setter
        private final int levelValue;

        LogLevel(String levelMessage, int levelValue){
            this.levelMessage = levelMessage;
            this.levelValue = levelValue;
        }
    }

    private static LogLevel loggingLevel;

    private static final PrintStream stdOut = System.out;

    public static void setLoggingLevel(LogLevel logLevel){
        loggingLevel = logLevel;
    }

    public static void setLoggingLevel(String logLevel){
        loggingLevel = Arrays.stream(LogLevel.values())
                .filter(level -> level.levelMessage.matches(logLevel))
                .toList()
                .get(0);
    }

    /**
     * Gets the current time in the Date Object
     * @return The current time in a Date Object calling Time.from(Instant.now())
     */
    private static Date getCurrentTime(){
        return Date.from(Instant.now());
    }

    /**
     * Writes a message to the console in the format TIME, LOG_INFO, MESSAGE
     * @param level The LogLevel of the message
     * @param log The log message to be printed
     */
    public static void writeToLog(LogLevel level, String... log){
        if(loggingLevel == null) {
            setLoggingLevel(LogLevel.DEBUG);
            writeToLog(LogLevel.WARN, "Logging level has not been set! Setting to debug, will print all messages.");
        }

        if(level.levelValue >= loggingLevel.levelValue)
            Arrays.stream(log).forEach(l -> stdOut.println(getCurrentTime() + ": " + level.levelMessage + " " + l));
    }
}
