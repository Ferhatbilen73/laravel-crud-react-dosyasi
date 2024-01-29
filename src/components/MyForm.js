import React, { Component } from "react";

class MyForm extends Component {
  state = {
    form: { name: "", email: "", isEdit: false },
    btnName: "Save",
    btnClass: "ui primary button submit-button",
  };

  componentDidUpdate(prevProps) {
    if (prevProps.customer !== this.props.customer && !this.isEmptyObj(this.props.customer)) {
      this.setState({
        form: { ...this.props.customer, isEdit: true },
        btnName: "Update",
        btnClass: "ui orange button submit-button",
      });
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      form: { ...prevState.form, [name]: value },
    }));
  };

  onFormSubmit = (event) => {
    event.preventDefault();

    if (this.formValidation()) {
      this.props.onFormSubmit(this.state.form);
      this.clearFormFields();
    }
  };

  formValidation = () => {
    const { name, email } = this.state.form;

    // Değerlerin tanımlı olduğunu kontrol et ve ardından trim metodunu çağır
    if (!name || !email || name.trim() === "" || email.trim() === "") {
      alert("Lütfen tüm alanları doldurun.");
      return false;
    }

    return true;
  };

  clearFormFields = () => {
    this.setState({
      form: { name: "", email: "", isEdit: false },
    });
  };

  isEmptyObj = (obj) => {
    return Object.entries(obj).length === 0 && obj.constructor === Object;
  };

  render() {
    return (
      <form className="ui form">
        <div className="fields">
          <div className="four wide field">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={this.handleChange}
              value={this.state.form.name}
            />
          </div>

          <div className="four wide field">
            <label>E-mail</label>
            <input
              type="email"
              name="email"
              placeholder="joe@schmoe.com"
              onChange={this.handleChange}
              value={this.state.form.email}
            />
          </div>

          <div className="four wide field">
            <button
              className={this.state.btnClass}
              onClick={this.onFormSubmit}
            >
              {this.state.btnName}
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default MyForm;
