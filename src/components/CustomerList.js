import React, { Component } from "react";
import Customer from "./Customer";
class CustomerList extends Component {
  onDelete = (id) =>{
    this.props.onDelete(id);
//console.log("customer list", id);
  };

  onEdit = data =>{
    this.props.onEdit(data);
   console.log("customer list", data);
  }; 


  render() {
    const { customers } = this.props;

    // Check if customers is an array and not empty before mapping over it
    if (!Array.isArray(customers) || customers.length === 0) {
      return <div>No customers to display</div>;
    }

    return (
      <div className="data">
        <table className="ui celled table">
          <thead>
            <tr>
              <th style={{ width: "50px", textAlign: "center" }}>#</th>
              <th>Name</th>
              <th>E-mail</th>
              <th style={{ width: "148px" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <Customer
              key={customer.id}
              customer={customer}
              onDelete={this.onDelete}
              onEdit={this.onEdit}
                  />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default CustomerList;
