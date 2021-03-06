import React, { Component } from 'react';
import {connect} from 'react-redux';

import Person from '../components/Person/Person';
import AddPerson from '../components/AddPerson/AddPerson';

import * as actionTypes from '../store/actions';

class Persons extends Component {
    state = {
        persons: []
    };

    personAddedHandler = (onAddPerson) => {
        const newPerson = {
            id: Math.random(), // not really unique but good enough here!
            name: `Person ${Math.random() * 100}`,
            age: Math.floor( Math.random() * 40 )
        };

        onAddPerson(newPerson);
        // this.setState( ( prevState ) => {
        //     return { persons: prevState.persons.concat(newPerson)}
        // } );
    };

    personDeletedHandler = (personId) => {
        this.setState( ( prevState ) => {
            return { persons: prevState.persons.filter(person => person.id !== personId)}
        } );
    };

    render () {
        return (
            <div>
                <AddPerson personAdded={() => this.personAddedHandler(this.props.onAddPerson)} />
                {this.props.pers.map(person => (
                    <Person 
                        key={person.id}
                        name={person.name} 
                        age={person.age} 
                        clicked={() => this.props.onDeletePerson(person.id)}/>
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        pers: state.persons
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAddPerson: (person) => dispatch({type: actionTypes.ADD_PERSON, person: person}),
        onDeletePerson: (id) => dispatch({type: actionTypes.DELETE_PERSON, id: id})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Persons);