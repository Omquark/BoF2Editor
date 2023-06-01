package com.omquark.BoF2Editor.object;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ToString
public class Rom {

    //The rom data
    private final List<Integer> bank;
    private Game game;

    public Rom(){
        bank = new ArrayList<>(65536);

        for(int i = 0; i < 65536; i++)
            bank.add(0);
    }

    public Rom(List<Integer> data){
        bank = data;
        List<Spell> spellList = createSpellList();
        List<Mob> mobList = createMobList();
        List<Item> itemList = createItemList();
        game = new Game(
            spellList,
            mobList,
            itemList
        );
    }

    private List<Spell> createSpellList(){
        ArrayList<Spell> spellList = new ArrayList<>();
        //0x53 spells
        int spellCount = 0x53;
        int spellOffset = 0x584F0 + 0x200;//Headerless offset
        int spellSize = 0x10;
        for(int i = 0; i < spellCount; i++){
            spellList.add(
                new Spell(
                    bank.subList(spellOffset + (i * spellSize),
                    spellOffset + spellSize + (i * spellSize))
                )
            );
        }
        return spellList;
    }

    private List<Mob> createMobList(){
        ArrayList<Mob> mobList = new ArrayList<>();
        //0x80 mobs
        int mobCount = 0x80;
        int mobOffset = 0x59000;
        int mobSize = 0x20;
        for(int i = 0; i < mobCount; i++){
            mobList.add(
                new Mob(
                    bank.subList(mobOffset + (i * mobSize),
                    mobOffset + mobSize + ( i * mobSize))
                )
            );
        }
        return mobList;
    }

    private List<Item> createItemList(){
        ArrayList<Item> itemList = new ArrayList<>();
        //0x100 items
        int itemCount = 0x100;
        int itemOffset = 0x70000 + 0x200;//Header offset
        int itemSize = 0x10;
        for(int i = 0; i < itemCount; i++){
            itemList.add(
                new Item(
                    bank.subList(itemOffset + (i * itemSize),
                        itemOffset + itemSize + (i * itemSize))
                )
            );
        }
        return itemList;
    }

    public void setByteAt(int index, int value){
        bank.set(index, value);
    }

    public int getByteAt(int index){
        return bank.get(index);
    }
}
