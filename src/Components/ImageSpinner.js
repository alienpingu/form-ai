import React, {Component} from 'react';
import {Spinner } from 'react-bootstrap'


class ImageSpinner extends Component {
    constructor(props) {
        super(props)
        this.state = {
            info: props.dataFromParent,
            isLoading: true
        }
    }
    
    handleLoad = () => this.setState({isLoading: false})


    componentWillMount() {
      (this.state.info === undefined) ? this.setState({isLoading: true}) : console.log('null')
    }

    render() {
        
        return (
            <div id="image-spinner">
                <Spinner style={{display: (this.state.isLoading) ? "block" : "none"}} animation="border" />
                <img 
                  style={{display: (this.state.isLoading) ? "none" : "flex"}} 
                  src={this.state.info.src} 
                  alt={this.state.info.alt} 
                  onLoad={this.handleLoad} 
                  fluid/>
            </div>
        )    
    }
}

export default ImageSpinner