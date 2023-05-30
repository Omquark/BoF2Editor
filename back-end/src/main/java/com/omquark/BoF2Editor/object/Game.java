package com.omquark.BoF2Editor.object;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@ToString
public class Game {
    List<Spell> spellList;
    List<Mob> mobList;
    List<Item> itemList;
}
