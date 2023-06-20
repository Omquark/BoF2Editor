import './App.css';
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';

import { ItemComp } from './component/Item';
import { SpellTable } from './component/Spell/SpellTable';
import { createContext, useEffect, useState } from 'react';

export const SpellListContext = createContext();
export const ItemListContext = createContext();
export const MobListContext = createContext();

export default function App() {

  const [itemList, setItemList] = useState([]);
  const [spellList, setSpellList] = useState([]);
  const [mobList, setMobList] = useState([]);
  const [fileLoaded, setFileLoaded] = useState(false);

  useEffect(() => {
    if(localStorage.getItem('vanillaRom')){
      setFileLoaded(true);
    }
  }, [])

  const submitForm = async (event) => {
    let dataStream;
    let file;
    let response;
    let result = [];
    let fileInput = document.getElementById('romInput');
    event.preventDefault();

    file = fileInput.files.item(0);
    localStorage.setItem('romPath', fileInput.value);
    console.log(file);
    dataStream = file.stream().getReader();
    result = localStorage.getItem('vanillaRom');

    while (true  && !fileLoaded) {
      let temp = await dataStream.read();
      if (!temp.value) break;
      temp.value.forEach(b => {
        result.push(b);
      })
    }

    setFileLoaded(true);

    localStorage.setItem('vanillaRom', result);

    response = await fetch("http://localhost:8080/rom",
      {
        method: "POST",
        body: JSON.stringify(result),
      })
    let body = await response.json();
    setItemList(body.itemList);
    setSpellList(body.spellList);
    setMobList(body.mobList);
  }

  return (
    <div className='text-center'>
      <div className='d-flex'>
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

      <div className=''>
        {
          spellList.length > 0 ?
            <div>
              <SpellListContext.Provider value={spellList}>
                <SpellTable />
              </SpellListContext.Provider>
            </div> :
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