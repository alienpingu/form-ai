import React, {Component} from 'react'
import {Container, Row, Col, Button} from 'react-bootstrap'

class FormAI extends Component {
  constructor(props){
    super(props)
    this.state = {
      src:"https://picsum.photos/450",
      query: [
        {
          value: "x",
          text: "Pulsante 1"
        },
        {
          value: "y",
          text: "Pulsante 2"
        },
        {
          value: "z",
          text: "Pulsante 3"
        },
        {
          value: "p",
          text: "Pulsante 4"
        }
      ]
    }
  }


  // Decomenttare una volta che si ha la "route" dell' API corretta, la funzione aggiorna il FE renderizzato con i dati del JSON in risposta

  // ComponentDidMount(){
  //   fetch('ROUTE')
  //       .then(response => response.json())
  //       .then(data => this.setState(data));
  // }

  // Funzione per inviare l'oggetto del form al backend, restituisce l'intero stato oltre al valore dell'opzione selezionata

  // sendResponse = () => {
  //    const requestOptions = {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(this.state)
  //   };
  //   fetch('https://jsonplaceholder.typicode.com/posts', requestOptions)
  //       .then(response => response.json())
  //       .then(data => this.setState({ postId: data.id }));
  // }

  render() {

    return(
      <Container className="pt-5">
        <Row>
          <Col sm={12} lg={6}>
            <img src={this.state.src} alt="what-is-this" />
          </Col>
          <Col sm={12} lg={6}>
            <h3 className="mb-3">Cosa vedi nell' immagine?</h3>
            <div className="options">
              {
                this.state.query.map((el, id) => {
                  return(<Button 
                    key={id} 
                    variant="light" 
                    onClick={()=> this.setState({selected: el.value})} 
                    className={(this.state.selected === el.value) ? 'active' : null}
                    block>{el.text}
                  </Button>)
                })
              }
            </div>
          </Col>
          <Col sm="12" className="my-4">
            <Button variant="success" onClick={() => this.sendResponse()} block>Invia risposta</Button>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default FormAI;