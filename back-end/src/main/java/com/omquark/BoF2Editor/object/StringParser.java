package com.omquark.BoF2Editor.object;

import java.util.List;

/**
 * Parses strings from and to a way to store and read from the rom
 */
public class StringParser {

    /**
     * Converts a string from the rom into what will be displayed while playing
     * This will convert the following bytes:
     * 0x00 to newLine
     * 0X29 to 0X2D ( to -
     * 0x2D to 0x2E - to .
     * 0xFF to space
     *
     * @param romString The string to convert
     */
    public static String fromRom(List<Integer> romString){
        StringBuilder sb = new StringBuilder();

        romString.forEach((ch) -> {
            if(ch.byteValue() == 0x00) sb.append("");
            else if(ch.byteValue() == 0x29) sb.append("-");
            else if (ch.byteValue() == 0x2D) sb.append(".");
            else if (ch.byteValue() == -0x01) sb.append(" ");
            else sb.append((char) ch.byteValue());
        });

        return sb.toString();
    }
}
