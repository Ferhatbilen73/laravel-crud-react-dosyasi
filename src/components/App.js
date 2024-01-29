import React, { Component } from "react";
import axios from "axios";
import MyForm from "./MyForm";
import CustomerList from "./CustomerList";
import Loader from "./Loader";
import "./app.css";

class App extends Component {
  state = {
    customers: [],
    customer: {},
    loader: false,
    url: "http://localhost:8000/api/students",
  };

  getCustomers = async () => {
    this.setState({ loader: true });
    try {
      const response = await axios.get(this.state.url);
      console.log("API Response:", response.data.Students);
      this.setState({ customers: response.data.Students, loader: false });
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  deleteCustomer = async (id) => {
    this.setState({ loader: true });
    try {
      await axios.delete(`${this.state.url}/${id}/delete`);
      this.getCustomers();
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  editCustomer = async (data) => {
    // clear customer obj
    this.setState({ customer: {}, loader: true });

    try {
      await axios.put(`${this.state.url}/${data.id}`, {
        name: data.name,
        email: data.email,
      });

      this.getCustomers(); // getCuatomers değil, getCustomers olarak değiştirildi
    } catch (error) {
      console.error("Error updating customer:", error);
    }
  };

  componentDidMount() {
    this.getCustomers();
  }

  onDelete = (id) => {
    this.deleteCustomer(id);
  };

  onEdit = (data) => {
    this.setState({ customer: data });
  };

  onFormSubmit = (data) => {
    //console.log('app',data);

    if (data.isEdit) {
      //if is edit true
      this.editCustomer(data);
    } else {
      //if is edit false
      this.createCustomer(data);
    }
  };

  render() {
    return (
      <div>
        <div className="ui fixed inverted menu">
          <div className="ui container">
            <a href="/#" className="header item">
              React JS CRUD with Laravel API
            </a>
          </div>
        </div>

        <div className="ui main container">
          <MyForm
            customer={this.state.customer}
            onFormSubmit={this.onFormSubmit}
          />
          {this.state.loader ? <Loader /> : ""}

          <CustomerList
            customers={this.state.customers}
            onDelete={this.onDelete}
            onEdit={this.onEdit}
          />
        </div>
      </div>
    );
  }
}

export default App;