import React, { Component } from "react";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import moment from "moment";
import { Button, Space, Select, Spin } from "antd";
import PouchDB from "pouchdb";
import PouchdbFind from "pouchdb-find";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const COUCH_DB = "YOUR IP AND EMAIL";
const { Option } = Select;
PouchDB.plugin(PouchdbFind);
export const remoteTaskTest = new PouchDB(`${COUCH_DB}"YOUR_ENDPOINT`);
export default class Photo extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      startDate: new Date(),
      status: "Active",
      user: "None",
      loading: true,
    };
  }

  componentDidMount() {
    this.getDataFromDbRemote();
  }
  handleChange(value) {
    this.setState({ status: value });
  }
  async getDataFromDbRemote() {
    this.setState({ loading: true });
    const today = moment(this.state.startDate).format("YYYY-MM-DD");
    const users = {
      name: this.state.user,
    };
    const select =
      (await this.state.user) == "None"
        ? {
            date: { $eq: today },
          }
        : {
            date: { $eq: today },
            users: { $eq: users.name },
          };
    remoteTaskTest
      .createIndex({
        index: { fields: ["date", "users"] },
      })
      .then(function () {
        return remoteTaskTest.find({
          selector: select,
          fields: [
            "_id",
            "date",
            "dsa",
            "category_items",
            "title",
            "description",
            "id_user",
            "store",
            "users",
          ],
        });
      })
      .then((res) => {
        // setRemoteStockData(res.docs);
        this.setState({ loading: false });
        this.setState({
          data: res.docs,
        });
      })
      .catch((err) => {
        this.setState({ loading: true });
      });
  }

  render() {
    const { data } = this.state;

    const colomns = [
      {
        Header: "Id",
        accessor: "_id",
        style: {
          width: "100%",
          maxWidth: 100,
          minWidth: 100,
          maxHeight: "100%",
        },
      },
      {
        Header: "Tanggal",
        accessor: "date",
        style: {
          width: 30,
          textAlign: "center",
        },
      },

      {
        Header: "Judul",
        accessor: "title",
        style: {
          width: 30,
          textAlign: "center",
        },
      },

      {
        Header: "User",
        id: "users",
        style: {
          width: 30,
          textAlign: "center",
        },
        // )),
      },

      {
        Header: "Nama Toko",
        accessor: "store",
        style: {
          width: 30,
          textAlign: "center",
        },
      },
      {
        Header: "User",
        accessor: "users",
        style: {
          width: 30,
          textAlign: "center",
        },
      },
      {
        Header: "Category",
        accessor: "category_items",
        style: {
          width: 30,
          textAlign: "center",
        },
      },

      {
        Header: "DSA",
        accessor: "dsa",
        style: {
          width: 30,
          textAlign: "center",
        },
      },
    ];

    return (
      <div>
        {this.state.loading ? (
          <div>
            <Spin size="large" />
          </div>
        ) : (
          <div>
            <ReactTable columns={colomns} data={data} defaultPageSize={5} />
            <div style={{ marginTop: 40 }}>
              <DatePicker
                selected={this.state.startDate}
                onChange={(date) => this.setState({ startDate: date })}
              />
            </div>
            <div>
              {/* <Select
            defaultValue="active"
            style={{ width: 120 }}
            onChange={(text) => this.setState({ dsa: text })}
          >
            <Option value="Active">Active</Option>
            <Option value="Cancel">Cancel</Option>
            <Option value="Progress">Progress</Option>
          </Select> */}
            </div>

            <div>
              <Select
                defaultValue={this.state.user}
                style={{ width: 120 }}
                onChange={(text) => this.setState({ user: text })}
              >
                <Option value="Kenzo">Kenzo</Option>
                <Option value="Ardy">Ardy</Option>
                <Option value="Jaka">Jaka</Option>
                <Option value="Maulana">Maulana</Option>
                <Option value="Usman">Usman</Option>
                <Option value="Rusna">Rusna</Option>
                <Option value="Yanto">Yanto</Option>
                <Option value="Yordania">Yordania</Option>
                <Option value="Surya">Surya</Option>
              </Select>
            </div>
            <Button
              key="back"
              onClick={() => this.getDataFromDbRemote()}
              style={{ backgroundColor: "white" }}
            >
              Search
            </Button>
          </div>
        )}
      </div>
    );
  }
}
