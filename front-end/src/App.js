import './App.css';
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';

export default function App() {

  const submitForm = async (event) => {
    // let file;
    // let fileInput = document.getElementById('romInput');
    event.preventDefault();

    //file = fileInput.files.item(0);
    //let dataStream = file.stream().getReader();

    let romData;
    //let result = await dataStream.read();
    
    //while(result != )
    
    console.log(romData);

    // let response = await fetch("http://localhost:8080/rom",
    //   {
    //     method: "POST",
    //     body: JSON.stringify({data: romData}),
    //   })
    //let body = response.body;
    //let status = response.status;
  }

  return (
    <div className='text-center d-flex'>
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
  )
}