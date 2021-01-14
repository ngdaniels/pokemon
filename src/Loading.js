import React, { Component } from "react";
import loadingPokeball from './Assets/loading-pokeball.png';
import styled from '@emotion/styled'

class Loading extends Component {
    render() {
        const Loader = styled.img`
            -webkit-animation: spin 2s linear infinite;
            animation: spin 2s linear infinite;
            @-webkit-keyframes spin {
            0% { -webkit-transform: rotate(0deg); }
            100% { -webkit-transform: rotate(360deg); }
            }
              
            @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
            }
        `
        
        return (
            <div style={{ textAlign: "center", padding: "10px", display: (this.props.show ? '' : 'none') }}>
                <Loader src={loadingPokeball} style={{ width: "20%", display: (this.props.show ? 'inline' : 'none') }} alt="loading" ></Loader>
            </div>
        )
    }
}

export default Loading;