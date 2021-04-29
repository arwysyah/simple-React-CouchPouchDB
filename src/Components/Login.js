import React, { Component } from "react";
import { Layout, Menu, Input, Button } from "antd";

import swal from "sweetalert";
const { Header, Content, Footer } = Layout;
class Login extends Component {
  state = {
    email: "",
    password: "",
  };
  handleChange = (event) => {
    // console.log(this.state.name,this.state.price,this.state.image_url)
    // this.setState({
    //   [event.target.name] :event.target.value

    // })

    this.setState({
      [event.target.name]: event.target.value,
    });
    // console.log(this.state.name,this.state.years, "pro");
  };
  handleLogin = () => {
    let token = "AxJXsagZJXAHSJASHHEbbKSJDdwak";
    if (this.state.email === "admin" && this.state.password === "password") {
      swal("Login Successfully!", "Success Login", "success").then(() => {
        localStorage.setItem("token", JSON.stringify(token));
        window.location.href = "/Home";
      });
    } else {
      swal("Login failed", "Your Password didn't match", "warning").then(() => {
        this.setState({
          password: "",
        });
      });
    }
    console.log(this.state.email, this.state.password);
  };
  render() {
    return (
      <div>
        <Layout>
          <Header className="header">
            <div className="logo" />
          </Header>
          <Content style={{ padding: "0 50px" }}>
            <Layout
              className="site-layout-background"
              style={{ padding: "24px 0" }}
            >
              <Input
                id="login1"
                type="search"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
                style={{
                  color: "black",
                  width: 100,
                  height: 40,
                  backgroundColor: "white",
                }}
              />
              <Input
                id="login"
                type="password"
                name="password"
                onChange={this.handleChange}
                value={this.state.password}
                style={{
                  color: "black",
                  width: 100,
                  height: 40,
                  marginTop: 12,
                  backgroundColor: "white",
                }}
              />
              <Button onClick={this.handleLogin}>Login</Button>
            </Layout>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Arwy Syahputra Siregar
          </Footer>
        </Layout>
      </div>
    );
  }
}
export default Login;
