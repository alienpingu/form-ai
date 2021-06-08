import React, {Component} from 'react'
import {Container, Row, Col, Button, ListGroup, Form } from 'react-bootstrap'

class Train extends Component {
  constructor(props){
    super(props)
    this.state = {
      src:"https://picsum.photos/450",
      info: {
        "name": "Lorem Ipsum",
        "brand": "Lorem Ipsum",
        "categories": ['Lorem 1', 'Lorem 2', 'Lorem 3', 'Lorem 4', 'Lorem 5']
      },
      query: [
        {
          value: "Pulsante 1",
          text: "Pulsante 1"
        },
        {
          value: "Pulsante 2",
          text: "Pulsante 2"
        },
        {
          value: "Pulsante 3",
          text: "Pulsante 3"
        },
        {
          value: "Pulsante 4",
          text: "Pulsante 4"
        }
      ],
      response: 0
    }
  }


  // Decomenttare una volta che si ha la "route" dell' API corretta, la funzione aggiorna il FE renderizzato con i dati del JSON in risposta

  // ComponentDidMount(){
  //   fetch('ROUTE')
  //       .then(response => response.json())
  //       .then(data => this.setState(data));
  // }

  // Funzione per inviare l'oggetto del form al backend, restituisce l'intero stato oltre al valore dell'opzione selezionata

  sendResponse = (e) => {
    //  const requestOptions = {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(this.state)
    // };
    // fetch('https://jsonplaceholder.typicode.com/posts', requestOptions)
    //     .then(response => response.json())
    //     .then(data => this.setState({ postId: data.id }));
    e.target.innerHTML = "Loading..."
    this.setState({selectedCategory: undefined})
    this.setState({selectedBtn: undefined})
    setTimeout(function() {
      e.target.innerHTML = "Invia risposta"
    }, 500);
  }


  render() {

    let isDisabled = Boolean(this.state.selectedCategory && this.state.selectedBtn)

    return(
      <Container>
        <Row className="bg-light shadow p-md-4">
          <Col sm={12} lg={6}>
            <img src={this.state.src} alt="what-is-this" className="w-100 py-2"/>
           {/* <ListGroup className="mt-4 d-none d-md-block">
              <ListGroup.Item><strong>selectedCategory:</strong> {this.state.selectedCategory}</ListGroup.Item>
              <ListGroup.Item><strong>selectedBtn:</strong> {this.state.selectedBtn}</ListGroup.Item>
            </ListGroup>*/}
          </Col>
          <Col sm={12} lg={6}>
            <h3 className="py-2">Cosa vedi nell' immagine?</h3>
            <ListGroup>
              <ListGroup.Item><strong>Nome:</strong> {this.state.info.name}</ListGroup.Item>
              <ListGroup.Item><strong>Brand:</strong> {this.state.info.brand}</ListGroup.Item>
            </ListGroup>
            <Form.Control 
              as="select" 
              onChange={(e) => this.setState({selectedCategory: e.target.value})} 
              border="primary"
              size="lg">
              {
                this.state.info.categories.map((el, id) => <option key={id} value={el}>{el}</option>)
              }
            </Form.Control>
            <div className="options py-2">
              {
                this.state.query.map((el, id) => {
                  return(<Button 
                    key={id} 
                    variant="outline-primary" 
                    onClick={()=> this.setState({selectedBtn: el.value})} 
                    className={`my-lg-4 ${(this.state.selectedBtn === el.value) ? 'active' : ""}`}
                    size="lg"
                    block>{el.text}
                  </Button>)
                })
              }
            </div>
          </Col>
          <Col sm="12">
            <SubmitBtn isDisabled={!isDisabled} sendResponse={this.sendResponse}/>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Train;


function SubmitBtn(props) {
  return(
    <Button 
      variant="success" 
      onClick={(e) => props.sendResponse(e)} 
      size="lg"
      className="my-2"
      disabled={props.isDisabled}
      block >Invia risposta</Button>
  )

}