package com.omquark.bof2editor.object;

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
    private final List<Integer> data;

    //Lists for game objects
    List<Spell> spellList;
    List<Mob> mobList;
    List<Item> itemList;

    private Game game;

    public Rom() {
        data = new ArrayList<>(65536);

        for (int i = 0; i < 65536; i++)
            data.add(0);
    }

    public Rom(List<Integer> data) {
        this.data = data;
        createSpellList();
        createMobList();
        createItemList();
        game = new Game(
                spellList,
                mobList,
                itemList
        );
    }

    private void createSpellList() {
        spellList = new ArrayList<>();
        //0x53 spells
        int spellCount = 0x53;
        int spellOffset = 0x584F0;// + 0x200;//Headerless offset
        int spellSize = 0x10;
        for (int i = 0; i < spellCount; i++) {
            spellList.add(
                    new Spell(
                            data.subList(spellOffset + (i * spellSize),
                                    spellOffset + spellSize + (i * spellSize))
                    )
            );
        }
    }

    private void createMobList() {
        mobList = new ArrayList<>();
        //0x80 mobs
        int mobCount = 0x80;
        int mobOffset = 0x59000;
        int mobSize = 0x20;
        for (int i = 0; i < mobCount; i++) {
            mobList.add(
                    new Mob(
                            data.subList(mobOffset + (i * mobSize),
                                    mobOffset + mobSize + (i * mobSize))
                    )
            );
        }
    }

    private void createItemList() {
        itemList = new ArrayList<>();
        //0x100 items
        int itemCount = 0x100;
        //Starts at 0x70000
        int itemOffset = 0x70000;
        //Has size of 0x10
        int itemSize = 0x10;
        for (int i = 0; i < itemCount; i++) {
            itemList.add(
                    new Item(
                            data.subList(itemOffset + (i * itemSize),
                                    itemOffset + itemSize + (i * itemSize))
                    )
            );
        }
    }

    public void setByteAt(int index, int value) {
        data.set(index, value);
    }

    public int getByteAt(int index) {
        return data.get(index);
    }

    /**
     * Pulls, decompresses, and converts a String from the ROM into ASCII format
     *
     * @param position Position of the String. bad Strings will terminate early
     * @return The converted String in readable format
     */
    public String convertSingleString(final Integer position) {
        int readChar;
        StringBuilder sb = new StringBuilder();
        for (int offset = 0; position + offset < data.size(); offset++) {
            readChar = data.get(position + offset);
            switch (readChar) {
                case (0x00) -> { //Illegal Op
                }
                case (0x01) -> { //End of String
                    sb.append("\n\n");
                }
                case (0x02) -> { //Newline
                    sb.append('\n');
                }
                case (0x03) -> { //Read from dictionary
                    short tempShort;
                    Integer tempInt;
                    offset++;
                    //Read the next Byte, this is the dictionary index
                    tempInt = data.get(position + offset);
                    //Double because we're searching a 16 bit array
                    tempShort = (short) (tempInt * 2);
                    //Get the pointer in the dictionary offset with the index
                    //0x22DE00 is the default base for the dictionary index
                    tempInt = data.get(0x22DE00 + tempShort);
                    tempInt += data.get(0x22DE00 + tempShort + 1) * 0x100;
                    tempInt += 0x22D000;
                    //We are now at the beginning of the dictionary
                    //The first number is the count of Bytes in the dictionary index
                    tempShort = data.get(tempInt).shortValue();
                    //Now we convert the number of bytes read
                    for (int dictOffset = 0; dictOffset < tempShort; dictOffset++) {
                        readChar = convertByte(data.get(tempInt + dictOffset + 1));
                        sb.append((char) readChar);
                    }
                }
                case (0x04) -> { //Wait, end of box
                    sb.append("%04\n");
                }
                case (0x05) -> { //Begin/End colored Text
                }
                case (0x06) -> { //Display lead char name
                }
                case (0x07) -> { //Display char name from 0x282AC6 with offset of next byte

                    int tempPos;
                    offset++;
                    //Read the next char to use as an index
                    readChar = data.get(position + offset);
                    //Set the new temp position at the base of the character name
                    //Each character has 4 byte names, so multiply index by 4
                    tempPos = 0x282AC6 + (readChar * 4);
                    //Read the characters name (4 Bytes)
                    for (int nameOffset = 0; nameOffset < 4; nameOffset++) {
                        sb.append(data.get(tempPos + nameOffset));
                    }
                }
                case (0x08) -> { //Displays choice. Goes to index on yes, display next text on no
                }
                case (0x09) -> { //Display text from 0x55160(Cities) 0x00 terminated, 8 char max
                }
                case (0x0A) -> { //Display text from 0x58500 with index of next byte (Spells)
                }
                case (0x0B) -> { //Sound effect from index
                }
                case (0x0C) -> { //Delay
                }
                case (0x0D) -> { //Delay longer
                }
                case (0x0E) -> { //Un documented/Unknown
                }
                case (0x0F) -> { //Unknown
                }
                case (0x10) -> { //Display japanese char from index of next byte
                }
                case (0x11) -> { //Display the dragon pendant with value of next byte
                }
                case (0x12) -> { //Change displayed pendant to a new value
                }
                case (0x13) -> { //Unknown/Unused
                }
                default -> {
                    sb.append((char) convertByte(readChar).byteValue());
                }
            }
            //if (readChar == 0x01) break;
        }
        return sb.toString();
    }

    /**
     * Converts a single byte into what the game would display
     * @param value The value of the byte
     * @return The new value after conversion
     */
    public static Integer convertByte(Integer value) {
        switch (value) {
            case (0x2D) -> { //0x2D to 0x2E, - to .
                return 0x2E;
            }
            case (0x3A) -> { //0x3A to 0x3A, : to : (Placeholder)
                return 0x3A;
            }
            case (0x3B) -> { // 0x3B to 0x2C, ; to ,
                return 0x2C;
            }
            case (0x3C) -> { //0x3C to 0x27, < to '
                return 0x27;
            }
            case (0x3D) -> { //0x3D to 0x25, = to middot, uses % as a place holder
                return 0x25;
            }
            case (0x3E) -> { //0x3E tp 0x21, > to !
                return 0x21;
            }
            case (0xFF) -> { //0xFF to 0x20, Space
                return 0x20;
            }
            default -> {
                return value;
            }
        }
    }
}
