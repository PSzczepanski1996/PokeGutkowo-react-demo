import React, { Component } from 'react';

class App extends Component {
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
            {this.state.objects.map(item => (
                <div>
                    <h1>{item.nickname}</h1>
                    <h2>{item.level}</h2>
                    <h3>{item.team}</h3>
                    <h4>{item.trainer}</h4>
                </div>
            ))}
            </div>
        );
    }
}

export default App;