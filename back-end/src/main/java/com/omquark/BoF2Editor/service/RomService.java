package com.omquark.BoF2Editor.service;

import com.omquark.BoF2Editor.object.Rom;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.sql.Array;
import java.util.ArrayList;
import java.util.List;

@Service
public class RomService {

    /**
     * Creates a Byte[] from a JSON object.
     * This will also validate the checksum of the ROM
     *
     * @param value The JSONObject containing the ROM data in the format of "element slow": "value"
     *              where element slot is !> 65535 or value !> 255
     */
    public Rom createRom(List<Integer> value){

        return new Rom(value);
    }
}
