package com.omquark.bof2editor.object;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;


/**
 * A spell as classified from the rom.
 * Total size in ROM is 16 bytes
 */
@Getter
@Setter
@ToString
public class Spell {
    //Name, 8 bytes
    private String name = "";

    //Spell cost, 2 bytes
    private int cost;

    //2 bytes: Spell Description(lowest 15 bits), set most significant bit for helpful effects
    private int description;

    //Element, 1 bit
    private int element;

    //Targeting/Other, 1 Byte
    private int specSwitches;

    //Additional switches, 1 Byte
    private int moreSwitches;

    //Mood Check, 1 Byte
    private int moodCheck;

    public Spell(List<Integer> spellStats){
        StringBuilder sb = new StringBuilder();
        spellStats.subList(0x00, 0x08).stream().map(c -> (char) Rom.convertByte(c).byteValue()).forEach(sb::append);
        name = sb.toString();
        cost = spellStats.get(0x8) + (spellStats.get(0x9) * 0x100);
        description = spellStats.get(0x0A) + (spellStats.get(0x0B) * 0x100);
        element = spellStats.get(0x0C);
        specSwitches = spellStats.get(0x0D);
        moreSwitches = spellStats.get(0x0E);
        moodCheck = spellStats.get(0x0F);
    }
}
