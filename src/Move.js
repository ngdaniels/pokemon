import React, { Component } from "react";
import './Move.css';
import Type from './Type.js';

class Move extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            move: props.move,
            showDetail: false
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

    toggleShowDetail = () => {
        this.setState({
            showDetail: !this.state.showDetail
        });
    };

    render() {
        let { isLoaded, error, moveDetail } = this.state;

        let message;
        if (!isLoaded) {
            message = "Loading Details ...";
        }
        else if (error) {
            message = "Cannot Load Details";
        }

        if (!isLoaded || error) {
            return (
                <div className="move-detail">
                    <div style={{ lineHeight: '3rem' }} onClick={this.toggleShowDetail}>
                        <span className="arrow" style={{ transform: this.state.showDetail ? 'rotate(90deg)' : 'rotate(0deg)' }}>
                            ►
                            </span>
                        <span className="bold">
                            {this.convertKebab(this.state.move.name)}
                        </span>
                    </div>
                    <div className="move-table-container" style={{ maxHeight: this.state.showDetail ? '15rem' : '0' }}>
                        <hr></hr>
                        { message }
                    </div>
                </div>
            )
        } else {
            return (
                <div className="move-detail">
                    <div style={{ lineHeight: '3rem' }} onClick={this.toggleShowDetail}>
                        <span className="arrow" style={{ transform: this.state.showDetail ? 'rotate(90deg)' : 'rotate(0deg)' }}>
                            ►
                        </span>
                        <span className="bold">
                            {this.convertKebab(moveDetail.name)}
                        </span>
                        <span style={{ float: "right" }}>
                            <Type key={moveDetail.name} type={moveDetail.type.name} />
                        </span>
                    </div>
                    <div className="move-table-container" style={{ maxHeight: this.state.showDetail ? '15rem' : '0' }}>
                        <table className="move-table">
                            <thead >
                                <tr>
                                    <td className="table-header-column">
                                        Power: {moveDetail.power ? moveDetail.power : 'N/A'}
                                    </td>
                                    <td className="table-header-column">
                                        PP: {moveDetail.pp}
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan="2">
                                        <div className="move-explanation">
                                            {moveDetail.effect_entries[0].effect}
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            )
        }
    }
}

export default Move;