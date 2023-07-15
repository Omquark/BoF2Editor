import { Modal } from "react-bootstrap";
import { useEffect, useState } from "react";

export function SpellModal(props) {

    const [spell, setSpell] = useState([]);

    useEffect (() => {
        setSpell(props.spell);
    }, [props.spell])

    return (
        <Modal show={props.show} onHide={props.hideModal}>
            <Modal.Header>
                <Modal.Title>{spell.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='d-flex'>
                    <span className='my-auto'>Cost:</span>
                    <span className='ms-4'>
                        <input
                            type='number'
                            className='form-control'
                            defaultValue={Number.parseInt(spell.cost)} />
                    </span>
                </div>
                <div>
                    <span className='my-auto'></span>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button className='btn btn-primary' onClick={props.hideModal}>Close</button>
                <button className='btn btn-primary' onClick={props.hideModal}>Cancel</button>
            </Modal.Footer>
        </Modal>
    )
}
