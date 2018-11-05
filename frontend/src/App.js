import React, { Component } from 'react';
import './index.css';
import { Switch, Route, NavLink } from 'react-router-dom';

function headerColor(playerTeam){
    const prefix = 'card-header '

    switch(playerTeam){
        case 'instinct': return prefix + 'bg-warning'
        case 'mystic': return prefix + 'bg-primary'
        case 'valor': return prefix + 'bg-danger'
    }
}

class Posts extends Component {
    constructor(){
        super();
        this.state = {
            currentPage: 1,
            objectsPerPage: 2,
            objects: [],
            isLoading: false,
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        this.setState({
            currentPage: Number(event.target.id)
        })
    }

    async componentDidMount(){
        try {
            this.setState({ isLoading: true });

            const res = await fetch('http://127.0.0.1:8000/post_api/');
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
        const { objects, currentPage, objectsPerPage } = this.state;
        const indexOfLastObject = currentPage * objectsPerPage;
        const indexOfFirstObject = indexOfLastObject - objectsPerPage;
        const currentObjects = objects.slice(indexOfFirstObject, indexOfLastObject)

        const renderObjects = currentObjects.map((item, index) => {
            return(
            <div>
                <h3 className='no-margin-h3'>{item.title}</h3>
                <small>Author: {item.author}</small>
                <div className='jumbotron' dangerouslySetInnerHTML={{__html: item.context}}></div>
            </div>
            )
        });

        const pageNumbers = [];
        for(let i = 1; i <= Math.ceil(objects.length / objectsPerPage); i++){
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
          return (
            <li className={number == this.state.currentPage ? 'page-item active' : 'page-item'}>
              <a
                className='page-link'
                onClick={this.handleClick}
                key={number}
                id={number}>
                    {number}
                </a>
            </li>
          );
        });

        return(
            <div>
                <div className='col-12'>
                    {renderObjects}
                </div>
                <ul className='pagination'>
                    {renderPageNumbers}
                </ul>
            </div>
        )
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
            <div className='col-12'>
            <h1><b>Gracze</b></h1>
            {this.state.objects.map((item, index) => (
                <div className='card mb-2'>
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
                    <div className='container-fluid'>
                        <b>O mnie:</b>
                        <p>{item.owner_about}</p>
                        <b>Link do Discorda:</b>
                        <p><a href={item.discord}>Discord</a></p>
                        <center>
                            <img src={item.owner_screenshot} className='owner-image'></img>
                        </center>
                    </div>
            ))}
            </div>
        );
    }
}

class Title extends Component {
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
        return(
            <div>
                {this.state.objects.map((settings, index) => (
                    <div>
                        {settings.title}
                    </div>
            ))}
            </div>
        )
    }
}

class Website extends Component {
     render(){
        return(
            <div>
                <nav className='navbar navbar-expand-lg navbar-light bg-light'>
                    <a className='navbar-brand' href="/"><Title/></a>
                    <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                    <ul className='navbar-nav mr-auto'>
                        <li className='nav-item'>
                            <NavLink to='/' exact className='nav-link' activeClassName='active'>Strona główna</NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink to='/players' className='nav-link' activeClassName='active'>Gracze</NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink to='/aboutme' className='nav-link' activeClassName='active'>O mnie</NavLink>
                        </li>
                    </ul>
                </div>
                </nav>

                <Switch>
                    <Route exact path='/' component={Posts}></Route>
                    <Route exact path='/players' component={Players}></Route>
                    <Route exact path='/aboutme' component={About}></Route>
                </Switch>
            </div>
        );
     }
}

export default Website;