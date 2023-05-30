package com.omquark.BoF2Editor.object;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class Item {

    //Name, 8 bytes
    private String name;

    //Cost, 2 bytes
    private int cost;

    //Description, 2 Bytes
    private int description;

    //Targeting and special switches, 1 Byte
    private int specSwitches;

    //Equip switches, 1 Byte
    private int equipSwitches;

    //ATP/DFP
    private int value;

    //Spell/Armor details
    private int spellWeight;

    public Item(List<Integer> rawItem){
        name = StringParser.fromRom(rawItem.subList(0x00, 0x08));
        cost = rawItem.get(0x08) + (rawItem.get(0x09) * 0x100);
        description = rawItem.get(0x0A) + (rawItem.get(0x0B) * 0x100);
        specSwitches = rawItem.get(0x0C);
        equipSwitches = rawItem.get(0x0D);
        value = rawItem.get(0x0E);
        spellWeight = rawItem.get(0x0F);
    }
}
