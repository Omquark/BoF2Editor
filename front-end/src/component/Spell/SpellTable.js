import { SpellRow } from "./SpellRow"

export function SpellTable(props) {
    return (
        <table className='table table-dark table-hover'>
            <thead style={{ position: 'sticky' }}>
            <tr style={{ position: 'sticky' }}>
                <th style={{ position: 'sticky' }}>Name</th>
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
                    props.spellList ? 
                    props.spellList.map(spell => <SpellRow spell={spell} />) :
                    <></>
                }
            </tbody>
        </table>
    )
}