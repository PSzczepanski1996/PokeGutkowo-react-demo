import React, { Component } from 'react';
import './index.css';

class Players extends Component {
    state = {
        objects: []
    }

    async componentDidMount(){
        try {
            const res = await fetch('http://127.0.0.1:8000/players_api/')
            const objects = await res.json();
            this.setState({
                objects
            });
        } catch(e){
            console.log(e);
        }
    }

    render(){
        return (
            <div>
            <h1><b>Gracze PokeGutkowo</b></h1>
            {this.state.objects.map(item => (
                <div class='player-class'>
                    <h2>{item.nickname}</h2>
                    <h3>{item.level}</h3>
                    <h4>{item.team}</h4>
                    <h5>{item.trainer}</h5>
                </div>
            ))}
            </div>
        );
    }
}

export default Players;