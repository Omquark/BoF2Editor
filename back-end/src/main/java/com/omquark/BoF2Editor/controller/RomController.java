package com.omquark.BoF2Editor.controller;

import com.omquark.BoF2Editor.object.Game;
import com.omquark.BoF2Editor.object.Rom;
import com.omquark.BoF2Editor.service.RomService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController
public class RomController {

    @Autowired
    RomService romService;

    @CrossOrigin(originPatterns = "*")
    @PutMapping(path="/rom", consumes={ MediaType.APPLICATION_JSON_VALUE,
                                            MediaType.TEXT_PLAIN_VALUE,
                                            MediaType.APPLICATION_OCTET_STREAM_VALUE})
    public ResponseEntity<Game> getRom(@RequestBody String body){

        List<Integer> romData = Arrays.stream(body.split(","))
                .map((str) -> {
                    if(str.startsWith("[")){
                        return Integer.parseInt(str.substring(1));
                    } else if (str.contains("]")) {
                        return Integer.parseInt(str.substring(0, str.length() - 1));
                    }
                    return Integer.parseInt((str));
                }).toList();

        Rom rom = romService.createRom(romData);
        Game game = rom.getGame();
        return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(game);
    }
}
