package com.omquark.BoF2Editor.controller;

import com.omquark.BoF2Editor.service.RomService;
import com.sun.tools.jconsole.JConsoleContext;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@CrossOrigin(origins="*")
public class RomHandler {

    @Autowired
    RomService romService;

    @PostMapping(path="/rom")
    public ResponseEntity<String> getRom(@RequestBody String body){
        JSONObject reqBody = new JSONObject(body);
        JSONObject data = reqBody.getJSONObject("data");
        JSONObject value = data.getJSONObject("value");
        try{
            data.get("65536");
        }catch (JSONException e){
            return ResponseEntity.status(400).contentType(MediaType.APPLICATION_JSON).body("ROM is not correct size!");
        }

        romService.createRom(value);

        return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body("Response from back-end");
    }
}
