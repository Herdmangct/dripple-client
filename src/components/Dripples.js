import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SERVER_URL = 'http://www.localhost:3000/api/dripples/';
// const SERVER_URL = 'http://www.dripples.herokuapp.com/api/dripples/';

class Dripples extends Component {
    constructor() {
        super();
        this.state = {
            featured_id: null,
            featured: false
        }
        this.saveEdit = this.saveEdit.bind( this );
        this.delete = this.delete.bind( this );
        this._handleClick = this._handleClick.bind( this );
    }

    saveEdit(title, content, dripple_id) {
        if (title === '' && content === '') {
            return;
        }
        console.log(title, content, dripple_id)
        let token = "Bearer " + localStorage.getItem("jwt");
        axios({method: 'put', url: `${SERVER_URL}${dripple_id}.json`, headers: {'Authorization': token}, data: {title: title, content: content, id: dripple_id}}).then(response => {
            console.log(response);
            this.props.updateDripples()
            this.setState({featured_id: null, featured: false});
        })

    }

    delete() {
        alert('Are you sure?'); // SOMETHING like an alert
        console.log('doing this');
        let token = "Bearer " + localStorage.getItem("jwt"); 
        axios({method: 'delete', url: `${SERVER_URL}${this.state.featured_id}.json`, headers: {'Authorization': token}}).then(response => {
            console.log(response);
            this.props.updateDripples();
            this.setState({featured_id: null, featured: false});
        })
    }

    _handleClick(i) {
        const { featured_id, featured } = this.state
        if (featured_id === null && !featured) {
            this.setState({featured_id: i, featured: !featured})
        } else if (featured && featured_id === i ) {
            this.setState({featured_id: null, featured: !featured})
        }
        console.log(this.state);
        console.log('this should zoom into clicked dripple', i)
        console.log('display dripple\'s text')
    }

    render() {
        const { featured_id, featured } = this.state;
        let controlOptions;
        if (featured) {
            controlOptions = (
                <div>
                    <EditDripple drippleId={ featured_id } onSubmit={ this.saveEdit } />
                    {/* <DeleteDripple drippleId={ featured_id } onSubmit={ this.saveDelete } /> */}
                    <button onClick={ this.delete }>Delete</button>
                    {/* <FindDripples drippleId={ featured_id } onSubmit={ this._handleConnect } />
                    <button onClick={ this._handleConnect }>Find Dripples</button> */}
                    <Link to={{ pathname: '/more_dripples', state: { dripple_id: { featured_id }} }}>Send off Dripple</Link>
                    {/* <Link to="more_dripples" dripple_id={ featured_id }>Send off Dripple</Link> */}
                </div>
            )
        }
        return (
            <div>
                {this.props.allDripples.map((dp) => 
                    <div className="dripple" key={dp.id}>
                        <div key={dp.id} onClick={() => this._handleClick(dp.id)}>
                                {dp.title} {dp.content}
                        </div>
                        {dp.id === featured_id ? controlOptions : null}
                    </div>
                )}
            </div>
        )
    }
}

class EditDripple extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            id: this.props.drippleId
        }
        this._handleSubmit = this._handleSubmit.bind( this );
        this._handleTitle = this._handleTitle.bind( this );
        this._handleContent = this._handleContent.bind( this );
    }


    _handleSubmit(event) {
        event.preventDefault();
        this.props.onSubmit(this.state.title, this.state.content, this.state.id)
        this.setState({ title: '', content: '' });
    }

    _handleTitle(event) {
        this.setState({ title: event.target.value })
    }

    _handleContent(event) {
        this.setState({ content: event.target.value })
    }

    render() {
        return (
            <div>
                <form onSubmit={ this._handleSubmit }>
                    <textarea onChange={ this._handleTitle } value={ this.state.title }></textarea>
                    <textarea onChange={ this._handleContent } value={ this.state.content }></textarea>
                    <button type="submit">Update</button>
                </form>
                { console.log(this.props.drippleId)}
            </div>
        )
    }
}


// class FindDripples extends Component {
//     render() {
//         return (
//             <div>
//                  Get connected with similar dripples coming soon
//                     {/* View list of featured dripples */}
//                     {/* need a like system? dripple grows the more it is liked? turns gold? */}
//                     {/* show dripples according to categories, or tags. Maybe not by location */}
//                 { console.log(this.props.drippleId)}

//             </div>
//         )
//     }
// }

export default Dripples;