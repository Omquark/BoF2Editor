package com.omquark.BoF2Editor.object;

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
        name = StringParser.fromRom(spellStats.subList(0x00, 0x08));
        cost = spellStats.get(0x8) + (spellStats.get(0x9) * 0x100);
        description = spellStats.get(0x10) + (spellStats.get(0x11) * 0x100);
        element = spellStats.get(0x12);
        specSwitches = spellStats.get(0x13);
        moreSwitches = spellStats.get(0x14);
        moodCheck = spellStats.get(0x15);
    }
}