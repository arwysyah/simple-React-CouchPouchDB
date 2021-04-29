import React, { Component } from "react";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import moment from "moment";
import { Button, Space, Select, Spin } from "antd";
import PouchDB from "pouchdb";
import PouchdbFind from "pouchdb-find";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const COUCH_DB = "YOUR IP AND EMAIL AND PASSWORD";
const { Option } = Select;
PouchDB.plugin(PouchdbFind);
export const remoteTaskTest = new PouchDB(`${COUCH_DB}"YOUR_ENDPOINT`);
export default class Gift extends Component {
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
            startDate: { $eq: today },
          }
        : {
            // date: { $eq: today },
            created_by: { $eq: users.name },
          };
    remoteTaskTest
      .createIndex({
        index: { fields: ["start_date", "created_by"] },
      })

      .then(function () {
        return remoteTaskTest.find({
          selector: select,
          fields: [
            "_id",
            "start_date",
            "end_date",
            "name",
            "dso",
            "balance",
            "created_by",
            "status",
            "id",
          ],
        });
      })
      .then((res) => {
        // setRemoteStockData(res.docs);
        console.log(res.docs);
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
        Header: "Tanggal Mulai",
        accessor: "start_date",
        style: {
          width: 30,
          textAlign: "center",
        },
      },
      {
        Header: "Tanggal Berakhir",
        accessor: "start_date",
        style: {
          width: 30,
          textAlign: "center",
        },
      },

      {
        Header: "Nama Toko",
        accessor: "name",
        style: {
          width: 30,
          textAlign: "center",
        },
      },
      {
        Header: "Created By",
        accessor: "created_by",
        style: {
          width: 30,
          textAlign: "center",
        },
      },

      {
        Header: "Balance",
        accessor: "balance",
        style: {
          width: 30,
          textAlign: "center",
        },
      },
      {
        Header: "Status",
        accessor: "status",
        style: {
          width: 30,
          textAlign: "center",
        },
      },

      {
        Header: "DSO",
        accessor: "dso",
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
                <Option value="Arwy">Arwy</Option>
                <Option value="Alfan">Alfan</Option>
                <Option value="Hilmar">Hilmar</Option>
                <Option value="Maul">Maul</Option>
                <Option value="Oman">Oman</Option>
                <Option value="Rokujima">Rokujima</Option>
                <Option value="Surya Aris">Surya Aris</Option>
                <Option value="Yani">Yani</Option>
                <Option value="Yordan">Yordan</Option>
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
