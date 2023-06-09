import { createContext, useEffect, useState } from "react";

import { SpellModal } from './SpellModal';

export function SpellRow(props) {

    const [spell, setSpell] = useState(props.spell);

    const [show, setShow] = useState(false);

    const showModal = () => {
        setShow(true);
    }

    const hideModal = () => {
        console.log('hide modal')
        setShow(false);
    }

    //Title, value, type

    return (
        <tr onMouseDown={showModal}>
            {
                Object.values(spell).map(value => {
                    return (
                        <td>
                            {value}
                        </td>
                    )
                })
            }
            <SpellModal spell={spell} setSpell={setSpell} show={show} hideModal={hideModal} />
        </tr>
    )
}