import React, {Component} from 'react'
import {Container, Row, Col, Button, ListGroup } from 'react-bootstrap'
import Select from 'react-select'
import ImageSpinner from './ImageSpinner'

class Train extends Component {
  constructor(props){
    super(props)
    this.state = {
      info: {
        id: "KA52F",
        "src":"https://picsum.photos/seed/picsum/321",
        "alt":"alternative-text",
        "name": "Lorem Ipsum",
        "brands": [
          { value: 'chocolate', label: 'Chocolate' },
          { value: 'strawberry', label: 'Strawberry' },
          { value: 'vanilla', label: 'Vanilla' },
          { value: 'purple', label: 'Purple' },
          { value: 'red', label: 'Red' },
          { value: 'orange', label: 'Orange' },
          { value: 'blue', label: 'Blue' },
          { value: 'green', label: 'Green' },
          { value: 'white', label: 'White' },

        ],
        "categories": [
          { value: "Categoria 1", label: "Categoria 1"  },
          { value: "Categoria 2", label: "Categoria 2"  },
          { value: "Categoria 3", label: "Categoria 3"  },
          { value: "Categoria 4", label: "Categoria 4"  }
        ]
      },
      response: {
        id: 0
      }
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
    // FAKE ricevimento di dati
    let seed = Math.floor(Math.random() * (100 - 0)) + 0;
    let info = this.state.info
    info.id = `RND-${seed}`
    info.src = `https://picsum.photos/seed/pic${seed}/321`
    // Cambia la scritta prima di inviare la richiesta
    e.target.innerHTML = "Loading..."
    // Pulisci informazioni usate
    this.setState({info: undefined})
    // #####################
    // INSERIRE QUI POST REQ
    //  const requestOptions = {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(this.state)
    // };
    // fetch('https://jsonplaceholder.typicode.com/posts', requestOptions)
    //     .then(response => response.json())
    //     .then(data => this.setState({ postId: data.id }));
    // #####################
    setTimeout(function() {
      e.target.innerHTML = "Invia risposta"
    }, 500);
    // Prepara lo stato per il prossimo input
    this.setState({info: info})
    this.setState({selectedCategory: ""})
    this.setState({selectedBrand: ""})
  }
  // Funzione per aggiornare in tempo reale l' option selezionata
  handleChangeCategory = selectedCategory => this.setState({selectedCategory})
  handleChangeBrand = selectedBrand => this.setState({selectedBrand})

  render() {

    let {selectedCategory, selectedBrand} = this.state;
    let isDisabled = Boolean(selectedCategory && selectedBrand)

    return(
      <Container>
        <Row id="form-ai" className="bg-light shadow sic">
          <Col sm={12} lg={6}>
          <ImageSpinner dataFromParent={this.state.info}/>
            <ListGroup id ="info-list">
              <ListGroup.Item><strong>ID: </strong> {this.state.info.id}</ListGroup.Item>
              <ListGroup.Item><strong>SRC: </strong> {this.state.info.src}</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col sm={12} lg={6}>
            <p className="h3 py-2">Cosa vedi nell' immagine?</p>
            <ListGroup>
              <ListGroup.Item><strong>Nome:</strong> {this.state.info.name}</ListGroup.Item>
            </ListGroup>
            <hr />

            <p>Seleziona una categoria</p>
            <Select 
              id="select-category"
              value={selectedCategory}
              onChange={this.handleChangeCategory}
              placeholder="Digita una categoria"
              options={this.state.info.categories} 
              required/>
              <hr />
            <p>Seleziona un brand (marca)</p>
             <Select 
              value={selectedBrand}
              onChange={this.handleChangeBrand}
              placeholder="Digita un Brand (Marca)"
              options={this.state.info.brands} 
              required/>
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
      id="submitBtn"
      variant="success" 
      onClick={(e) => props.sendResponse(e)} 
      size="lg"
      disabled={props.isDisabled}
      block >Invia risposta</Button>
  )
}