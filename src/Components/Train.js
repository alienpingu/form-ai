import React, {Component} from 'react'
import {Container, Row, Col, Button, ListGroup } from 'react-bootstrap'

import Select from 'react-select';

class Train extends Component {
  constructor(props){
    super(props)
    this.state = {
      info: {
        id: "KA52F",
        "src":"https://picsum.photos/seed/picsum/321",
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
        "options": [
          { value: "Pulsante 1", label: "Pulsante 1"  },
          { value: "Pulsante 2", label: "Pulsante 2"  },
          { value: "Pulsante 3", label: "Pulsante 3"  },
          { value: "Pulsante 4", label: "Pulsante 4"  }
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
    //  const requestOptions = {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(this.state)
    // };
    // fetch('https://jsonplaceholder.typicode.com/posts', requestOptions)
    //     .then(response => response.json())
    //     .then(data => this.setState({ postId: data.id }));
    e.target.innerHTML = "Loading..."
    this.setState({selectedCategory: ""})
    this.setState({selectedBtn: ""})
    setTimeout(function() {
      e.target.innerHTML = "Invia risposta"
    }, 500);
    let seed = Math.floor(Math.random() * (100 - 0)) + 0;
    let info = this.state.info
    info.id = `RND-${seed}`
    info.src = `https://picsum.photos/seed/pic${seed}/321`
    this.setState({info: info})

  }
  // Funzione per aggiornare in tempo reale l' option selezionata
  handleChange = selectedCategory => this.setState({selectedCategory})

  componentDidUpdate(prevState) {
    console.log("Pagina aggiornata")
  }

  render() {

    let {selectedCategory, selectedBtn} = this.state;
    let isDisabled = Boolean(selectedCategory && selectedBtn)
    return(
      <Container>
        <Row id="form-ai" className="bg-light shadow p-md-5 sic">
          <Col sm={12} lg={6}>
           <img id="foto-ai" src={this.state.info.src} alt="what-is-this" className="w-100 py-2 sic" fluid thumbnail />
            <ListGroup className="py-md-2">
              <ListGroup.Item><strong>ID: </strong> {this.state.info.id}</ListGroup.Item>
              <ListGroup.Item><strong>SRC: </strong> {this.state.info.src}</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col sm={12} lg={6}>
            <h3 className="py-2 mb-md-5">Cosa vedi nell' immagine?</h3>
            <ListGroup>
              <ListGroup.Item><strong>Nome:</strong> {this.state.info.name}</ListGroup.Item>
            </ListGroup>
              <Select 
                value={selectedCategory}
                onChange={this.handleChange}
                placeholder="Seleziona un brand (marca)"
                options={this.state.info.brands} 
                required/>
          
            <div className="options py-2">
              {
                this.state.info.options.map((el, id) => {
                  return(<Button 
                    key={id} 
                    variant="outline-primary" 
                    onClick={()=> this.setState({selectedBtn: el.value})} 
                    className={`my-lg-4 ${(selectedBtn === el.value) ? 'active' : ""}`}
                    size="lg"
                    block>{el.label}
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
      className="my-2 p-md-3"
      disabled={props.isDisabled}
      block >Invia risposta</Button>
  )

}