package com.omquark.bof2editor.object;

import com.omquark.bof2editor.Logger.Logger;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class Script {

    List<String> scriptArray;

    List<String> getGameScript(List<Integer> rom){
        int bankIncrementOffset = 0x22DDF0;
        int indexPosition = 0x22DE00;
        int bankOffset = 0x00;
        int index = 0x00;


        for( ; indexPosition < 0x22FFFE; indexPosition += 0x02, index += 2){
            int value = rom.get(indexPosition) + (rom.get(indexPosition + 0x01) * 0x100);
            for(int loopOffset = 0; loopOffset < 0x10; loopOffset += 2){
                int check = rom.get(bankIncrementOffset + loopOffset) +
                        rom.get(bankIncrementOffset + loopOffset + 1) * 0x100;

                bankOffset = 0x00;
                if(check != 0x00 && check < value){
                    bankOffset++;
                }
            }
        }
        Logger.writeToLog(Logger.LogLevel.DEBUG, Integer.toString(bankOffset));
        return new ArrayList<>();
    }
}
