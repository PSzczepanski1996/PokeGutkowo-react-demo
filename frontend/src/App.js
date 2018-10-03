import React, { Component } from 'react';
import './index.css';

function headerColor(playerTeam){
    const prefix = 'card-header '

    switch(playerTeam){
        case 'instinct': return prefix + 'bg-warning'
        case 'mystic': return prefix + 'bg-primary'
        case 'valor': return prefix + 'bg-danger'
        default: return prefix + 'bg-light'
    }
}

class Players extends Component {
    state = {
        objects: [],
        isLoading: false,
    }

    async componentDidMount(){
        try {
            this.setState({ isLoading: true });

            const res = await fetch('http://127.0.0.1:8000/players_api/')
            const objects = await res.json();
            this.setState({
                objects: objects,
                isLoading: false
            });
        } catch(e){
            console.log(e);
        }
    }

    render(){
        if(this.state.isLoading){
            return <h7>Ładowanie</h7>;
        }
        return (
            <div className='col-12'>
            <h1><b>Gracze</b></h1>
            {this.state.objects.map(item => (
                <div className='card mb-2'>
                    <div className={headerColor(item.team)}>
                        <h4>Drużyna: {item.team}</h4>
                    </div>
                        <h5>{item.nickname}</h5>
                        <h7>Poziom: {item.level}</h7>
                        {item.trainer_code ? <h7>Trainer code: {item.trainer_code}</h7> : null}
                </div>
            ))}
            </div>
        );
    }
}

export default Players;