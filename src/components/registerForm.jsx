import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import auth from "../services/authService";
import * as userService from "../services/userService";
import { toast } from "react-toastify";
import { lowerCase } from "lodash";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: { name: "", username: "" },
  };
  schema = {
    username: Joi.string().required().email().label("Username"),
    password: Joi.string().required().min(5).label("Password"),
    name: Joi.string().required().label("Username"),
  };
  doSubmit = async () => {
    try {
      const response = await userService.register(this.state.data);
      const yy = auth.loginWithjwt(response.headers["x-auth-token"]);
      if (!yy) {
        toast("Register successfully");
        setTimeout(() => {
          window.location = "/";
        }, 1000);
      }

      // window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        const err = ex.response.data.includes("User");
        err
          ? (errors.username = ex.response.data)
          : (errors.name = ex.response.data);

        this.setState({ errors });
      }
    }
  };
  render() {
    return (
      <div>
        <h1> Register</h1>
        <form onSubmit={this.handlesubmit}>
          {this.renderInput("username", "Email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
