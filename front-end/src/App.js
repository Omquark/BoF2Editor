import './App.css';
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';

import { ItemComp } from './component/Item';
import { SpellComp } from './component/Spell';
import { useState } from 'react';

export default function App() {

  const [itemList, setItemList] = useState([]);
  const [spellList, setSpellList] = useState([]);

  const submitForm = async (event) => {
    let file;
    let fileInput = document.getElementById('romInput');
    event.preventDefault();

    file = fileInput.files.item(0);
    let dataStream = file.stream().getReader();

    let result = [];

    while (true) {
      let temp = await dataStream.read();
      if (!temp.value) break;
      temp.value.forEach(b => {
        result.push(b);
      })
    }

    let response = await fetch("http://localhost:8080/rom",
      {
        method: "POST",
        body: JSON.stringify(result),
      })
    let body = await response.json();
    setItemList(body.itemList);
    setSpellList(body.spellList);
  }

  return (
    <div className='text-center'>
      <div>
        <Card className='col-4 mx-auto'>
          <Card.Body>
            <Form onSubmit={(e) => submitForm(e)}>
              <div className='d-flex text-nowrap'>
                <Form.Label htmlFor='romInput'>Upload ROM</Form.Label>
                <Form.Control type='file' id='romInput' />
              </div>
              <Button type='submit' className='mt-3'>Submit</Button>
            </Form>
          </Card.Body>
        </Card>
      </div>

      <div className='d-flex flex-wrap border'>

        {
          Array.isArray(spellList) && spellList.length > 0 ?
            spellList.map(spell => {
              return (
                spell.name !== '' ?
                  <SpellComp spellStats={spell} /> : //spell.name !== ''
                  <></>
              )
            }) : //Array.isArray(spellList) && spellList.length > 0
            <></>
        }
        {/**
        Array.isArray(itemList) && itemList.length > 0 ?
        itemList.map(item => {
            return (
              item.name !== '' ?
                <ItemComp itemStats={item} /> : //item.name !== ''
              <></> 
            )
          }) : //Array.isArray(itemList) && itemList.length > 0
          <></>
        */}
      </div>
    </div>
  )
}