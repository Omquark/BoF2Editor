package com.omquark.BoF2Editor.object;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;


public class Rom {

    //The rom data
    private ArrayList<Byte> bank;

    public Rom(){
        bank = new ArrayList<>(65536);

        for(int i = 0; i < 65536; i++)
            bank.add((byte) 0);
    }

    public Rom(ArrayList<Byte> data){
        bank = new ArrayList<>(data.stream().toList());
    }

    public void setByteAt(int index, Byte value){
        bank.set(index, value);
    }

    public Byte getByteAt(int index){
        return bank.get(index);
    }
}
