package com.omquark.BoF2Editor.object;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString

/**
 * Contains monster information, total size is 32 bytes in ROM
 */
public class Mob {

    //Name, 8 bytes
    private String name;

    //MaxHP, 2 Bytes
    private int mHP;

    //MaxAP, 2 Bytes
    private int mAP;

    //Level, 1 Byte
    private int level;

    //Attack Power, 2 Bytes
    private int atp;

    //Defense, 2 Bytes
    private int dfp;

    //Agility, 2 Bytes
    private int agil;

    //Unknown 1, 1 Byte
    private int unknown1;

    //Experience, 2 Bytes
    private int xp;

    //Zenny, 2 Bytes
    private int zenny;

    //Item set for drops, 1 byte
    private int dropSet;

    //Unknown 2, 1 Byte
    private int unknown2;

    //Drop Rate, 1 Byte
    private int dropRate;

    //Unknown 3, 2 bytes;
    private int unknown3;

    //unknown 4, 2 bytes
    private int unknown4;

    public Mob(List<Integer> rawMobList){
        name = StringParser.fromRom(rawMobList.subList(0x00, 0x08));
        mHP = rawMobList.get(0x08) + (rawMobList.get(0x09) * 0x100);
        mAP = rawMobList.get(0x0A) + (rawMobList.get(0x0B) * 0x100);
        level = rawMobList.get(0x0C);
        atp = rawMobList.get(0x0D) + (rawMobList.get(0x0E) * 0x100);
        dfp = rawMobList.get(0x0F) + (rawMobList.get(0x10) * 0x100);
        agil = rawMobList.get(0x11) + (rawMobList.get(0x12) * 0x100);
        unknown1 = rawMobList.get(0x13);
        xp = rawMobList.get(0x14) + (rawMobList.get(0x15) * 0x100);
        zenny = rawMobList.get(0x16) + (rawMobList.get(0x17) * 0x100);
        dropSet = rawMobList.get(0x18);
        unknown2 = rawMobList.get(0x19);
        dropRate = rawMobList.get(0x1A);
        unknown3 = rawMobList.get(0x1B) + (rawMobList.get(0x1C) * 0x100);
        unknown4 = rawMobList.get(0x1D) + (rawMobList.get(0x1E) * 0x100);
    }
}
