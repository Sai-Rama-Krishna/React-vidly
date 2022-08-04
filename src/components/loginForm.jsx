import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import auth from "../services/authService";
import { Redirect } from "react-router";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: { username: "" },
  };
  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      const toas = await auth.login(data.username, data.password);
      if (!toas) {
        toast("Login successfully");
        const { state } = this.props.location;
        setTimeout(() => {
          window.location = state ? state.from.pathname : "/";
        }, 2000);
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />;

    return (
      <div>
        <form onSubmit={this.handlesubmit}>
          {this.renderInput("username", "Email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>{" "}
        <br />
        <p> New User </p>{" "}
        <span>
          {" "}
          <Link to="/register" style={{ marginBottom: 20 }}>
            Register Here
          </Link>{" "}
        </span>
      </div>
    );
  }
}

export default LoginForm;
