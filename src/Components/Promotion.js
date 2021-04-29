import React, { Component } from "react";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import moment from "moment";
import { Button, Select, Spin } from "antd";
import PouchDB from "pouchdb";
import PouchdbFind from "pouchdb-find";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const COUCH_DB = "YOUR_EMAIL:PASSWORD&YOURIPADDRESS";
const { Option } = Select;
PouchDB.plugin(PouchdbFind);
export const remoteTaskTest = new PouchDB(`${COUCH_DB}YOUR ENDPOINT`);
export default class Promotion extends Component {
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

    const select = {
      date: { $eq: today },
    };

    remoteTaskTest
      .createIndex({
        index: { fields: ["date"] },
      })

      .then(function () {
        return remoteTaskTest.find({
          selector: select,
          fields: [
            "_id",
            "date",
            "dsa",
            "code",
            "store",
            "chain",
            "dso",
            "title",
            "content",
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
        Header: "Tanggal ",
        accessor: "date",
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

      {
        Header: "Kode",
        accessor: "code",
        style: {
          width: 30,
          textAlign: "center",
        },
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
        Header: "Chain",
        accessor: "chain",
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

      {
        Header: "Judul",
        accessor: "title",
        style: {
          width: 30,
          textAlign: "center",
        },
      },
      {
        Header: "Konten",
        accessor: "content",
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
            <div></div>

            <div></div>
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
