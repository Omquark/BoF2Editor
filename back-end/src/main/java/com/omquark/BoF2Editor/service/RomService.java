package com.omquark.BoF2Editor.service;

import com.omquark.BoF2Editor.object.Rom;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.sql.Array;
import java.util.ArrayList;

@Service
public class RomService {

    /**
     * Creates a Byte[] from a JSON object.
     * This will also validate the checksum of the ROM
     *
     * @param value The JSONObject containing the ROM data in the format of "element slow": "value"
     *              where element slot is !> 65535 or value !> 255
     */
    public boolean createRom(JSONObject value){
        ArrayList<Byte> romData = new ArrayList<>(65536);

        //value.toMap().


        for(int i = 0; i < 65536; i++){
            romData.add(Integer.valueOf(value.getInt(Integer.toString(i))).byteValue());
        }
        Rom rom = new Rom(romData);

        return false;
    }
}
