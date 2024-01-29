import React, { Component } from "react";

class Customer extends Component {
  render() {
    const { customer, onDelete, onEdit } = this.props;

    return (
      <tr>
        <td style={{ textAlign: "center" }}>{customer.id}</td>
        <td>{customer.name}</td>
        <td>{customer.email}</td>
        <td>
          <button
            className="ui blue button"
            onClick={() => onEdit(customer)}
          >
            Edit
          </button>
          <button
            className="ui red button"
            onClick={() => onDelete(customer.id)}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  }
}

export default Customer;
