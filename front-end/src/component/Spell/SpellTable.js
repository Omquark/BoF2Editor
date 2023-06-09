import { useContext } from "react";
import { SpellRow } from "./SpellRow";
import { SpellListContext } from "../../App";

export function SpellTable() {

    const spellList = useContext(SpellListContext);
    return (
        <table className='table table-dark table-hover'>
            <thead>
            <tr>
                <th>Name</th>
                <th>Cost</th>
                <th>Description</th>
                <th>Element</th>
                <th>Special Switches</th>
                <th>More Switches</th>
                <th>Mood Check</th>
            </tr>
            </thead>
            <tbody>
                {
                    spellList ?
                    spellList.map((spell, index) => <SpellRow spell={spell} index={index}/>) :
                    <></>
                }
            </tbody>
        </table>
    )
}