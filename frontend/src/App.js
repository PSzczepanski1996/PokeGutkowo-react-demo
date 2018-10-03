import React, { Component } from 'react';
import './index.css';

function headerColor(playerTeam){
    const prefix = 'card-header '

    switch(playerTeam){
        case 'instinct': return prefix + 'bg-warning'
        case 'mystic': return prefix + 'bg-primary'
        case 'valor': return prefix + 'bg-danger'
        case 'rocket': return prefix + 'bg-light'
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

            const res = await fetch('http://127.0.0.1:8000/players_api/');
            const objects = await res.json();
            objects.map(function(v){
                v.clickState = false
            })
            this.setState({
                objects,
                isLoading: false
            });
        } catch(e){
            console.log(e);
        }
    }

    handleClick(index){
        let objectCopy = [...this.state.objects]
        objectCopy[index].team = 'rocket';
        this.setState({
            objects: objectCopy
        })
    }

    render(){
        if(this.state.isLoading){
            return <h7>Ładowanie</h7>;
        }
        return (
            <div className='col-12'>
            <h1><b>Gracze</b></h1>
            {this.state.objects.map((item, index) => (
                <div className='card mb-2' onClick={()=> this.handleClick(index)}>
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