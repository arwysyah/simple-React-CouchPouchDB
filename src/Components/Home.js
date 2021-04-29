import React from "react";
import { Layout, Menu, Icon, Row, Col } from "antd";
import "antd/dist/antd.css";
import "./styles/Home.css";
import { WaveLoading } from "react-loadingg";
import Task from "./Task";
import swal from "sweetalert";
import PouchDB from "pouchdb";
import PouchdbFind from "pouchdb-find";
import Photo from "./Photo";
import Gift from "./Gift";
import Promotion from "./Promotion";
import "react-datepicker/dist/react-datepicker.css";
const COUCH_DB = "FILL WITH YOUR IP AND EMAIL PASSWORD";
PouchDB.plugin(PouchdbFind);
export const remoteTaskTest = new PouchDB(`${COUCH_DB}"YOUR ENDPOINT"`);

const { Header, Sider, Content } = Layout;

export default class Home extends React.Component {
  state = {
    collapsed: false,
    startDate: new Date(),
    isLoading: true,
    drivers: [],
    filter: "active",
    user: [],
    button: "task",
    transaction: [],
    referral: "",
    gift: false,
    motoListing: [],
    search: "",
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  componentDidMount() {
    let bridge = JSON.parse(localStorage.getItem("token"));
    if (bridge === null) {
      window.location.href = "/";
    } else {
      setTimeout(() => {
        this.setState({ isLoading: false });
      }, 500);
      this.getDataFromDbRemote();
    }
  }
  async getDataFromDbRemote() {
    remoteTaskTest
      .createIndex({
        index: { fields: ["date"] },
      })
      .then(function () {
        return remoteTaskTest.find({
          selector: {
            date: { $eq: "2021-04-24" },
          },
          fields: [
            "approvals",
            "date",
            "end_task",
            "id",
            "locations",
            "reason",
            "reviews",
          ],
        });
      })
      .then((res) => {
        // setRemoteStockData(res.docs);
        console.log(res.docs);
        this.setState({
          data: res.docs,
        });
      })
      .catch((err) => {
        console.log(err, "er");
      });
  }

  render() {
    const { isLoading, drivers, user } = this.state;
    // console.log(drivers, "sss");

    if (isLoading) {
      return (
        <div>
          <WaveLoading size="large" />
        </div>
      );
    }
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item
              key="1"
              onClick={() =>
                this.setState({
                  button: "task",
                  gift: false,
                })
              }
            >
              <Icon type="user" style={{ color: "green", size: 20 }} />

              <span>Task</span>
            </Menu.Item>

            <Menu.Item
              key="5"
              onClick={() =>
                this.setState({
                  button: "photo",
                  gift: true,
                })
              }
            >
              <Icon type="plus-circle-o" style={{ color: "green", size: 25 }} />

              <span> Photo</span>
            </Menu.Item>
            <Menu.Item
              key="5s"
              onClick={() =>
                this.setState({
                  button: "promotion",
                })
              }
            >
              <Icon type="plus-circle-o" style={{ color: "green", size: 25 }} />

              <span>Promo</span>
            </Menu.Item>
            <Menu.Item
              key="4"
              onClick={() =>
                this.setState({
                  button: "gift",
                  gift: false,
                })
              }
            >
              <Icon type="history" style={{ color: "green", size: 25 }} />

              <span>Gift</span>
            </Menu.Item>
            <Menu.Item
              key="t"
              onClick={() =>
                swal(
                  "Log Out Successfully!",
                  "Success Log Out",
                  "success"
                ).then(() => {
                  localStorage.clear();
                  window.location.href = "/";
                })
              }
            >
              <Icon type="plus-circle-o" style={{ color: "red", size: 25 }} />

              <span>Log Out</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: "#fff", padding: 0 }}>
            <Row>
              <Col span={8}>
                {" "}
                <Icon
                  className="trigger"
                  style={{ fontSize: 20 }}
                  type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
                  onClick={this.toggle}
                />
              </Col>
            </Row>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              background: "#fff",
              minHeight: "100vh",
            }}
          >
            {this.state.button === "photo" ? (
              <div>
                <h1>Photo</h1>
                <Photo />
              </div>
            ) : this.state.button === "gift" ? (
              <div>
                <h1>Gift</h1>
                <Gift />
              </div>
            ) : this.state.button === "task" ? (
              <div>
                <h1>Task</h1>
                <Task />
              </div>
            ) : (
              <div>
                <h1>Promosi</h1>
                <Promotion />
              </div>
            )}
          </Content>{" "}
        </Layout>
      </Layout>
    );
  }
}
