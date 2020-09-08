import React, {useEffect, useState} from 'react';
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import NumberFormat from 'react-number-format';
import Columns from 'react-columns';
import Form from 'react-bootstrap/Form'
function App() {
  const [latest, setLatest] = useState([]);
  const [results, setResults] = useState([]);
  const [searchCountries, setSearchCountries] = useState("");
 
  useEffect(() =>{
    axios.all([
      axios.get("https://disease.sh/v3/covid-19/all"),
      axios.get("https://disease.sh/v3/covid-19/countries")
    ])
      .then(res => {
        setLatest(res[0].data);
        setResults(res[1].data);
      })
      .catch(err => {
        console.log(err);
      });
  },[]);

  const date = new Date(parseInt(latest.updated)).toUTCString().split(' ').slice(0, 4).join(' ');
  const lastUpdated = date.toString();
  const filterCountries = results.filter(item => {
    return searchCountries !== "" ? item.country.includes(searchCountries)  :  item;
  });
  const countries = filterCountries.map((data, i) => {
    return (
      <Card bg="light" text="dark" className="text-center" style={{ margin: "10px"}}>
        <Card.Img key={i} variant="top" src={data.countryInfo.flag}></Card.Img>
        <Card.Body>
    <Card.Title>{data.country}</Card.Title>
    <Card.Title>Trường hợp: <NumberFormat value={data.cases} displayType={"text"} thousandSeparator={true}></NumberFormat></Card.Title>    
    <Card.Title>Tử vong: <NumberFormat value={data.deaths} displayType={"text"} thousandSeparator={true}></NumberFormat></Card.Title>
    <Card.Title>Hồi phục: <NumberFormat value={data.recovered} displayType={"text"} thousandSeparator={true}></NumberFormat></Card.Title> 
        </Card.Body>
      </Card>
    ); 
  });

  var queries = [{
    columns: 2,
    query: 'min-width: 500px'
  }, {
    columns: 3,
    query: 'min-width: 1000px'
  }];

  return (
    <div>
      <br />
      <h2 style={{textAlign: "center"}}>Tình hình SARS-CoV 2</h2>
      <br />
      <CardDeck>
  <Card 
    bg="secondary" 
    text="white" 
    className="text-center" 
    style={{margin: "10px"}}> 
    <Card.Body>
      <Card.Title>Trường hợp</Card.Title>
      {/* <Card.Text>
        {latest.cases}
      </Card.Text> */}
      <NumberFormat 
        value={latest.cases}
        displayType={"text"}
        thousandSeparator={true}
        style={{fontSize: "30px"}}
      > </NumberFormat>
    </Card.Body>
    <Card.Footer>
      <small>Cập nhật {lastUpdated}</small>
    </Card.Footer>
  </Card>
  <Card 
    bg="danger"  
    text="white" 
    className="text-center" 
    style={{margin: "10px"}}>
    <Card.Body>
      <Card.Title>Tử vong</Card.Title>
      {/* <Card.Text>
        {latest.deaths}
      </Card.Text> */}
      <NumberFormat 
        value={latest.deaths}
        displayType={"text"}
        thousandSeparator={true}
        style={{fontSize: "30px"}}
      > </NumberFormat>
    </Card.Body>
    <Card.Footer>
    <small>Cập nhật {lastUpdated}</small>
    </Card.Footer>
  </Card>
  <Card 
    bg="info"  
    text="white" 
    className="text-center" 
    style={{margin: "10px"}}>
    <Card.Body>
      <Card.Title>Hồi phục</Card.Title>
      {/* <Card.Text>
        {latest.recovered}
      </Card.Text> */}
      <NumberFormat 
        value={latest.recovered}
        displayType={"text"}
        thousandSeparator={true}
        style={{fontSize: "30px"}}
      > </NumberFormat>
    </Card.Body>
    <Card.Footer>
      <small>Cập nhật {lastUpdated}</small>
    </Card.Footer>
  </Card>
</CardDeck>
<br />
<Form>
  <Form.Group controlId="formGroupSearch">
    <Form.Control type="text" placeholder="Nhập tên quốc gia" onChange= {e => setSearchCountries(e.target.value)}/>
  </Form.Group>
</Form>
<Columns queries={queries}>{countries}</Columns>
    </div>
  );
}

export default App;
