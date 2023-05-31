export function SpellComp(props){
    return (
        <div>
            {
                Object.keys(props.spellStats).forEach(key => console.log(key))
            }
        </div>
    )
}