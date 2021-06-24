import React, {Component} from 'react'
import {Container, Row, Col, Button, ListGroup,  FormControl } from 'react-bootstrap'
import Select from 'react-select'
import AsyncSelect from 'react-select/async';

import ImageSpinner from './ImageSpinner'

class Train extends Component {
  constructor(props){
    super(props)
    this.state = {
      selectedBrand:"",
      selectedCategory:"",
      selectedName:"",
      info: {
        codeFile: false,
        "src":"",
        "alt":"alternative-text",
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
      status: {
        checked_codeFile: true,
        counter: 0
      }
    }
  }
  // Prima che la pagina venga renderizzata esegui...
  // Choose a valid obj 
  infoHandler = (data) => {
    this.checkFile(data[this.state.status.counter]).then((response) => {
      let status = this.state.status
      status.checked_codeFile = response.status
      if (response.status === "true") {
        status.counter++
        this.setState({status: status})
        this.infoHandler(data)
      } else {
        this.renderInfo(data, this.state.status.counter)
      }
    })


  }


  // Controlla che l' id del file NON sia già inserito 
  checkFile = (codeFile) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ codeFile: codeFile })
    };
    return fetch('https://dev.aiknowthis.com/apiAiknowthis/api/contrProd', requestOptions).then(response => response.json())
  }


  //Ottieni lista di tutti gli oggetti
  fetchList = () => {
    fetch('https://dev.aiknowthis.com/apiAiknowthis/api/listFile')
      .then(response => response.json())
      .then(data => {
        this.setState({listOfInfo: data})
        this.infoHandler(data)
    });
  } 
  // Fai una chiamata per ottenere la lista di categorie
  fetchBrands = () => {
    fetch('https://dev.aiknowthis.com/apiAiknowthis/api/selectBrand')
      .then(response => response.json())
      .then(data => {
        let info = this.state.info
        info.brands = data
        this.setState({info: info})
    });
  }

  fetchCategories = () => {
    fetch('https://dev.aiknowthis.com/apiAiknowthis/api/category')
      .then(response => response.json())
      .then(data => {
        let info = this.state.info
        info.categories = data
        this.setState({info: info})
    });
  }

  // Popola le info se il file è valido
  renderInfo = (data, index) => {
      let info = this.state.info
      let newInfo = data[index]
      info.codeFile = newInfo.codeFile
      info.src = newInfo.url
      info.alt = newInfo.file
      this.setState({info: info})
  }

  sendInfoSkipped = () => {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          codeFile: this.state.info.codeFile,
          brand: this.state.selectedBrand.value
         })
    };
    return fetch('https://dev.aiknowthis.com/apiAiknowthis/api/newBrand', requestOptions).then(response => response.json())
  }

  // Funzione per inviare l'oggetto del form al backend, restituisce l'intero stato oltre al valore dell'opzione selezionata
  sendResponse = (e) => {
    e.target.innerHTML = "Loading..."
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "codeFile": this.state.info.codeFile,
            "selectedCategory": this.state.selectedCategory.value,
            "selectedBrand": this.state.selectedBrand.value,
            "selectedName": this.state.selectedName
        })
    };
    console.log("Invio Form", requestOptions.body)
    fetch('https://dev.aiknowthis.com/apiAiknowthis/api/saveProduct', requestOptions)
      .then(response => response.json())
      .then(data => {
        if(data) {
          e.target.innerHTML = "Invia risposta"
          // Prepara lo stato per il prossimo input
          let info = this.state.info
          info.codeFile = false
          this.setState({info: info})
          this.setState({selectedCategory: ""})
          this.setState({selectedBrand: null})
          this.setState({selectedName: ""})
          this.infoHandler(this.state.listOfInfo)
        } else {
          console.log("[saveProduct]:Errore nel salvataggio")
        }
        
      });
    

  }

  // Funzione per il pulsante di skip
  handleSkipInfo = (e) => {
    let s = this.state.status
    s.counter++
    this.setState({status: s})
    // this.sendInfoSkipped().then((response) => {
    //   if (response.status) {
    //       let info = this.state.info
    //       info.codeFile = false
    //       this.setState({info: info})
    //       this.setState({selectedCategory: ""})
    //       this.setState({selectedBrand: null})
    //       this.setState({selectedName: ""})
    //       this.infoHandler(this.state.listOfInfo)
    //       e.target.innerHTML = "Prossimo elemento"
    //   } else {
    //     console.log("[NewBrand]: Errore nel salvataggio dei dati ")
    //     e.target.innerHTML = "Riprova"

    //   }
      
    // })
    let info = this.state.info
    info.codeFile = false
    this.setState({info: info})
    this.setState({selectedCategory: ""})
    this.setState({selectedBrand: null})
    this.setState({selectedName: ""})
    this.infoHandler(this.state.listOfInfo)

    
  }
  // Funzione per aggiornare in tempo reale l' option selezionata
  handleChangeCategory = selectedCategory => this.setState({selectedCategory})
  handleChangeBrand = selectedBrand => this.setState({selectedBrand})
  handleChangeName = selectedName => this.setState({selectedName})

  filterColors = (inputValue: string) => {
      return this.state.info.brands.filter(i =>
        i.label.toLowerCase().includes(inputValue.toLowerCase())
      );
    };
  promiseOptions = inputValue =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve(this.filterColors(inputValue));
      }, 1000);
    });

  checkSkip = selectedBrand => (selectedBrand) ? (selectedBrand.value === 10007) ? true : false : false



  componentDidMount(){
    this.fetchList()
    this.fetchCategories()
    this.fetchBrands()
  }

  render() {

    let {selectedCategory, selectedBrand, selectedName} = this.state;
    let isDisabled1 = Boolean(Boolean(selectedCategory && selectedBrand && selectedName) || this.checkSkip(selectedBrand))
    // let isDisabled2 = Boolean(selectedCategory && this.checkSkip(selectedBrand) && selectedName)

    return(
      <Container>
        <Row id="form-ai" className="bg-light shadow sic">
          <Col sm={12} lg={6}>

            <ImageSpinner dataFromParent={this.state.info}/>
            <ListGroup id ="info-list" className="d-none d-lg-flex">
              <ListGroup.Item><strong>Nome:</strong> {this.state.info.alt}</ListGroup.Item>
              <ListGroup.Item><strong>ID: </strong> {this.state.info.codeFile}</ListGroup.Item>
              {/*<ListGroup.Item><strong>SRC: </strong> {this.state.info.src}</ListGroup.Item>*/}
            </ListGroup>
          </Col>
          <Col sm={12} lg={6}>
            <p className="h3 py-2">Cosa vedi nell' immagine?</p>
            <p>Seleziona una categoria</p>
            <Select 
              value={selectedCategory}
              onChange={this.handleChangeCategory}
              placeholder="Digita una categoria"
              options={this.state.info.categories} 
              isClearable

              />
            <hr />

            <p>Seleziona una marca</p>
              <AsyncSelect
                onChange={this.handleChangeBrand}
                placeholder="Digita una marca"
                loadOptions={this.promiseOptions}
                defaultValue={selectedBrand}
                value={selectedBrand}
                isClearable
              />
              <p className="text-muted pt-1">Se non conosci la marca, seleziona <span>noBrand</span> dall'elenco.</p>
              <hr />
              <p>Digita nome del prodotto</p>
              <FormControl
                placeholder="Digita il nome"
                aria-label="Username"
                onChange={(e) => this.handleChangeName(e.target.value)}
                value={selectedName}
              />
              <div className="btn-container">
                <SubmitBtn isDisabled={!isDisabled1} sendResponse={this.sendResponse}/>
                <SkipBtn  handleSkipInfo={this.handleSkipInfo}/>
              </div>
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
function SkipBtn(props) {
  return(
    <Button 
      id="submitBtn"
      variant="info" 
      onClick={(e) => props.handleSkipInfo(e)} 
      // disabled={props.isDisabled}
      block >Prossimo elemento</Button>
  )
}
