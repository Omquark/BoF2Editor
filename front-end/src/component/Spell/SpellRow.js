export function SpellRow(props) {
    return (
        <tr>
            <td>{props.spell.name}</td>
            <td>{props.spell.cost}</td>
            <td>{props.spell.description}</td>
            <td>{props.spell.element}</td>
            <td>{props.spell.specSwitches}</td>
            <td>{props.spell.moreSwitches}</td>
            <td>{props.spell.moodCheck}</td>
        </tr>
    )
}