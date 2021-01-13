import React, { Component } from "react";
import './Move.css';
import Type from './Type.js';

class Move extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            move: props.move
        };
    }

    componentDidMount = () => {
        this.mount = true;

        fetch(this.state.move.url)
        .then(res => res.json())
        .then(
            (result) => {
                if (this.mount) {
                    this.setState({
                        isLoaded: true,
                        moveDetail: result
                    });
                }
            },
            (error) => {
                if (this.mount) {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            }
        )
    }

    componentWillUnmount() {
        this.mount = false;
    }

    convertKebab = (text) => {
        let texts = text.split('-');

        let result = "";

        texts.forEach(text => {
            if (result) {
                result += ' ';
            }
            result += (text.charAt(0).toUpperCase() + text.slice(1));
        });

        return result;
    };

    render() {
        let { isLoaded, moveDetail } = this.state;

        if (!isLoaded) {
            return (
                <div className="move-detail">
                    <p className="bold">
                        {this.convertKebab(this.state.move.name)}
                    </p>
                </div>
            )  
        } else {
            return (
                <div className="move-detail">
                    <span style={{float: "right"}}>
                        <Type key={moveDetail.name} type={moveDetail.type.name} />
                    </span>
                    <p className="bold">
                        {this.convertKebab(moveDetail.name)}
                    </p>
                    <hr></hr>
                    <table className="move-table">
                        <thead>
                            <tr>
                                <td colSpan="2">
                                    {moveDetail.effect_entries[0].effect}
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{width: "50%", padding: "1rem 0"}}>
                                    Power: {moveDetail.power ? moveDetail.power : 'N/A'}
                                </td>
                                <td style={{width: "50%", padding: "1rem 0"}}>
                                    PP: {moveDetail.pp}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )
        }
    }
}

export default Move;