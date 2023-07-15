package com.omquark.bof2editor.object;

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

    public Mob(List<Integer> rawMob){
        StringBuilder sb = new StringBuilder();
        rawMob.subList(0x00, 0x08).stream().map(c -> (char) Rom.convertByte(c).byteValue()).forEach(sb::append);
        name = sb.toString();
        name = StringParser.fromRom(rawMob.subList(0x00, 0x08));
        mHP = rawMob.get(0x08) + (rawMob.get(0x09) * 0x100);
        mAP = rawMob.get(0x0A) + (rawMob.get(0x0B) * 0x100);
        level = rawMob.get(0x0C);
        atp = rawMob.get(0x0D) + (rawMob.get(0x0E) * 0x100);
        dfp = rawMob.get(0x0F) + (rawMob.get(0x10) * 0x100);
        agil = rawMob.get(0x11) + (rawMob.get(0x12) * 0x100);
        unknown1 = rawMob.get(0x13);
        xp = rawMob.get(0x14) + (rawMob.get(0x15) * 0x100);
        zenny = rawMob.get(0x16) + (rawMob.get(0x17) * 0x100);
        dropSet = rawMob.get(0x18);
        unknown2 = rawMob.get(0x19);
        dropRate = rawMob.get(0x1A);
        unknown3 = rawMob.get(0x1B) + (rawMob.get(0x1C) * 0x100);
        unknown4 = rawMob.get(0x1D) + (rawMob.get(0x1E) * 0x100);
    }
}
