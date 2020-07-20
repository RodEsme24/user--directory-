import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';

class Homepage extends Component {
    constructor() {
        super()
        this.state = { list: [], filteredList: [] }
    }
    componentDidMount() {

        fetch("https://randomuser.me/api/?results=100")
        .then(res => res.json())
        .then(res => {
            console.log(res)
            this.setState({
                list: res.results,
                filteredList: res.results
            })
        })
        .catch(err => {
            console.log(err)
        })
       

    }

    handleFilter = (sex)  => {
        let filtering = (sex === 'male') ? this.state.list.filter(item => item.gender === 'male') :  this.state.list.filter(item => item.gender === 'female')
        this.setState({
            filteredList: filtering
        })
    }

    render() {
        return (<div>
            <h1>User Directory</h1>
            <p>Create your user Directory</p>
            <button className="btn btn-primary m-3" onClick={() => this.handleFilter('male')}>Filter by Sex (male)</button>
            <button className="btn btn-primary m-3" onClick={() => this.handleFilter('female')}>Filter by Sex (female)</button>
            <button className="btn btn-secondary m-3" onClick={this.handleSort}>Sort by First Name</button>
            <Table striped bordered hover variant="dark">
  <thead>
    <tr>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Phone Number</th>
    </tr>
  </thead>
  <tbody>
    { this.state.filteredList.map(item => 
         ( 
            <tr>
                <td>{item.name.first}</td>
                <td>{item.name.last}</td>
                <td>{item.cell}</td>
            </tr>
        )
    )}
  </tbody>
</Table>
        </div>)
    }
}
export default Homepage;

