import React, { Component } from 'react';
import './index.css';
import { Switch, Route } from 'react-router-dom';

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
        clone: [],
        isLoading: false,
    }

    async componentDidMount(){
        try {
            this.setState({ isLoading: true });

            const res = await fetch('http://127.0.0.1:8000/players_api/');
            const objects = await res.json();
            this.setState({
                objects: objects,
                isLoading: false
            });
        } catch(e){
            console.log(e);
        }
    }

    handleClick(index){
        let objectsCopy = [...this.state.objects]
        if(objectsCopy[index].team !== 'rocket'){
            objectsCopy[index].previousTeam = objectsCopy[index].team;
            objectsCopy[index].team = 'rocket';
        }
        else{
            objectsCopy[index].team = objectsCopy[index].previousTeam;
        }
        this.setState({
            objects: objectsCopy
        })
    }

    render(){
        if(this.state.isLoading){
            return <h5>Ładowanie</h5>;
        }
        return(
            <div className='col-12'>
            <h1><b>Gracze</b></h1>
            {this.state.objects.map((item, index) => (
                <div className='card mb-2' onClick={()=> this.handleClick(index)}>
                    <div className={headerColor(item.team)}>
                        <h3>Drużyna: {item.team}</h3>
                    </div>
                        <h4>{item.nickname}</h4>
                        <h5>Poziom: {item.level}</h5>
                        {item.trainer_code ? <h5>Trainer code: {item.trainer_code}</h5> : null}
                </div>
            ))}
            </div>
        );
    }
}

class About extends Component {
    state = {
        objects: [],
        isLoading: false,
    }

    async componentDidMount(){
        try {
            this.setState({ isLoading: true });

            const res = await fetch('http://127.0.0.1:8000/settings_api/');
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
            return <h5>Ładowanie</h5>;
        }
        return(
            <div>
            {this.state.objects.map((item, index) => (
                    <div>
                        <b>O mnie:</b>
                        <p>{item.owner_about}</p>
                        <b>Link do Discorda:</b>
                        <p><a href={item.discord}>Discord</a></p>
                    </div>
            ))}
            </div>
        );
    }
}


class Website extends Component {
     render(){
        return(
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="#">PokeGutkowo demo</a>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="/">Gracze Gutkowa</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/aboutme">O mnie</a>
                        </li>
                    </ul>
                </div>
                </nav>

                <Switch>
                    <Route exact path='/' component={Players}></Route>
                    <Route exact path='/aboutme' component={About}></Route>
                </Switch>
            </div>
        );
     }
}

export default Website;