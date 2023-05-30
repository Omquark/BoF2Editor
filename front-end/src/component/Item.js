import Card from "react-bootstrap/Card";
import { ItemField } from "./ItemField";
import { useState } from "react";

export function ItemComp(props) {

    const [changingName, setChangingName] = useState(false);


    const changeName = () => {
        setChangingName(true);
    }

    return (
        <div className='col-2'>
            <Card className='border rounded-0'>
                <Card.Header className='h6' onDoubleClick={() => changeName()}>
                    <span hidden={changingName}>
                        {props.itemStats.name}
                    </span>
                    <span hidden={!changingName}>
                        <input type='text' id='name' defaultValue={props.itemStats.name}/>
                        {/* onBlur={() => setName()} */}
                    </span>
                </Card.Header>
                <Card.Body className='px-0 py-0 d-flex' style={{ fontSize: '12px' }}>
                    <div className='col-12 border'>
                        {/* Cost */}
                        <ItemField value={props.itemStats.cost} label='Cost (Zenny)' />
                        <ItemField value={props.itemStats.description} label='Description' />
                        <ItemField value={props.itemStats.value} label='ATP/DFP' />
                        <ItemField value={props.itemStats.equipSwitches} label='Equip Switches' />
                        <ItemField value={props.itemStats.specSwitches} label='Spec Switches' />
                        <ItemField value={props.itemStats.spellWeight} label='Spell/Weight' />
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
}