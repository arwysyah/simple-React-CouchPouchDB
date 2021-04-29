import React, { Component } from "react";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import moment from "moment";
import { Button, Select, Modal } from "antd";
import PouchDB from "pouchdb";
import PouchdbFind from "pouchdb-find";
import swal from "sweetalert";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const COUCH_DB = "YOUR EMAIL : PASSWORD AND ENDPOINT";
const { Option } = Select;
PouchDB.plugin(PouchdbFind);
export const remoteTaskTest = new PouchDB(`${COUCH_DB}YOUR ENDPOINT`);

const dataUser = [
  {
    name: "Kenzo",
    id_user: 15,
  },
  {
    name: "Ardy",
    id_user: 11,
  },
  {
    name: "Jaka",
    id_user: 18,
  },
  {
    name: "Maulana",
    id_user: 17,
  },
  {
    name: "Usman",
    id_user: 16,
  },
  {
    name: "Rasna",
    id_user: 21,
  },
  { name: "Surya", id_user: 3 },
  {
    name: "Yanto",
    id_user: 19,
  },
  {
    name: "Yordania",
    id_user: 133,
  },
];

export default class Transaction extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      startDate: new Date(),
      status: "None",
      user: "Kenzo",
      isModal: false,
      userData: {
        name: "Kenzo",
        id: "15",
      },
    };
  }

  componentDidMount() {
    this.getDataFromDbRemote();
  }
  handleChange(value) {
    this.setState({ status: value });
  }
  showModal = () => {
    this.setState({ isModal: true });
  };
  handleOk = () => {
    this.setState({ isModal: false });
  };
  handleCancel = () => {
    this.setState({ isModal: false });
  };

  async getDataFromDbRemote() {
    const today = moment(this.state.startDate).format("YYYY-MM-DD");
    const newStatus = this.state.status;
    const users = {
      name: this.state.user,
    };
    const ste =
      (await this.state.status) == "None"
        ? {
            date: { $eq: today },
            user: { name: { $eq: users.name } },
          }
        : {
            date: { $eq: today },
            status: { $eq: newStatus },
            user: { name: { $eq: users.name } },
          };
    remoteTaskTest
      .createIndex({
        index: { fields: ["date", "user"] },
      })
      .then(function () {
        return remoteTaskTest.find({
          selector: ste,
          fields: [
            "_id",
            "date",
            "status",
            "id",
            "locations",
            "reason",
            "user_id",
            "store",
            "user",
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

  handlePost = () => {
    let users = dataUser.filter((i, d) => {
      return i.name == this.state.user;
    });

    const dataTask = {
      approvals: null,
      date: moment().format("YYYY-MM-DD"),
      end_task: null,
      id: 588,
      locations: null,
      reason: null,
      reviews: null,
      setup: [
        {
          enable: "Cigarette",
        },
        {
          enable: "Confectionery",
        },
        {
          enable: "Snack",
        },
        {
          enable: "Beverage",
        },
        {
          enable: "Electronic ",
        },
      ],
      start_task: null,
      status: "Active",
      store_id: 3,
      type: null,
      updated_at: "2021-04-21T00:02:24.207122+00:00",
      urlImage: null,
      user_id: users[0].id_user,
      star: null,
      user: {
        name: users[0].name,
        roles: [
          {
            roles: "SPG",
          },
        ],
        members: [
          {
            userByLeader: {
              name: "Kenzo",
            },
          },
        ],
      },
      store: {
        address: "Javascript Street",
        dsa: "",
        dso: "",
        locations: null,
        id: 3,
        name: "",
        chain: "",
        category: "",
        code: "SC013",
      },
    };

    remoteTaskTest
      .post(dataTask)
      .then(async (response) => {
        swal("Add New Task Successfully!", "Success", "success").then(() => {
          window.location.reload();
        });
        console.log(response);
        this.handleOk();
      })
      .catch((err) => {
        swal("Add New Task Failed", `${err.toString()}`, "warning");
      });
  };
  changeDate = (item) => {
    let r = moment(Number(item)).format("YYYY Do MM");
    console.log(r);
    return r.toString();
  };
  render() {
    const { data, isModal } = this.state;
    console.log(this.state.userData, "data");
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
        Header: "end",
        accessor: "status",
        style: {
          width: 30,
          textAlign: "center",
        },
      },

      {
        Header: "User",
        id: "user",
        accessor: (data) => {
          return (
            <div>
              <span style={{ marginRight: "10px" }}>{data.user.name}</span>
              {/* <span>{item.value}</span> */}
            </div>
          );
        },
        // )),
      },
      {
        Header: "Nama Toko",
        id: "name",
        accessor: (data) => {
          return (
            <div>
              <span style={{ marginRight: "10px" }}>{data.store.name}</span>
              {/* <span>{item.value}</span> */}
            </div>
          );
        },
        // )),
      },
      {
        Header: "Alamat",
        id: "store",
        accessor: (data) => {
          return (
            <div>
              <span style={{ marginRight: "10px" }}>{data.store.address}</span>
              {/* <span>{item.value}</span> */}
            </div>
          );
        },
        // )),
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
        Header: "Id Task",
        accessor: "id",
        style: {
          width: 30,
          textAlign: "center",
        },
      },
    ];

    return (
      <div>
        <ReactTable columns={colomns} data={data} defaultPageSize={5} />
        <div style={{ marginTop: 40 }}>
          <DatePicker
            selected={this.state.startDate}
            onChange={(date) => this.setState({ startDate: date })}
          />
        </div>
        <div>
          <Select
            defaultValue="Active"
            style={{ width: 120 }}
            onChange={(text) => this.setState({ status: text })}
          >
            <Option value="Active">Active</Option>
            <Option value="Cancel">Cancel</Option>
            <Option value="Progress">Progress</Option>
          </Select>
        </div>

        <div>
          <Select
            defaultValue="Kenzo"
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

        <Modal
          title="Create Task"
          visible={isModal}
          onOk={() => this.handlePost()}
          onCancel={() => this.handleCancel()}
        >
          <div>
            <Select
              defaultValue="None"
              style={{ width: 120 }}
              onChange={(text) => this.setState({ user: text })}
            >
              {dataUser.map((i, d) => (
                <Option value={dataUser[d].name}>{dataUser[d].name}</Option>
              ))}
            </Select>
          </div>
        </Modal>
        <div>
          <Button type="primary" onClick={this.showModal}>
            Add New Task
          </Button>
        </div>
      </div>
    );
  }
}
