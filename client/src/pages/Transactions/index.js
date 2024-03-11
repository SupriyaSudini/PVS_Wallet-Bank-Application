import React from "react";
import PageTitle from "../../components/PageTitle";
import { Table, message } from "antd";
import TransferFundsModel from "./TransferFundsModel";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { GetTransactionsOfUser } from "../../apicalls/transactions";
import { useEffect } from "react";
import moment from "moment";
import DepositModal from "./DepositModal";

function Transactions() {
  const [showTransferFundsModel, setShowTranferFundsModel] =
    React.useState(false); // initially it is zero

  //for deposit modal
  const [showDepositModal, setShowDepositModal] = React.useState(false);

  const [data = [], setData] = React.useState([]);
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.users);

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text, record) => {
        return moment(record.createdAt).format("DD-MM-YYYY hh:mm:ss A");
      },
    },
    {
      title: "Transaction ID",
      dataIndex: "_id",
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
      render: (text, record) => {
        // return record.sender._id === user._id ? "Debit" : "Credit";
        if(record.sender._id === record.receiver._id){
          return "Deposit";
        } else if(record.sender._id === user._id){
          return "Debit";
        }else return "Credit";
      },
    },
    {
      title: "Reference Account",
      dataIndex: "",
      render: (text, record) => {
        return record.sender._id === user._id ? (
          <div>
            <h1 className="text-sm">
              {record.receiver.firstName} {record.receiver.lastName}
            </h1>
          </div>
        ) : (
          <div>
            <h1 className="text-sm">
              {record.sender.firstName} {record.sender.lastName}
            </h1>
          </div>
        );
      },
    },
    {
      title: "Reference",
      dataIndex: "reference",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetTransactionsOfUser();
      if (response.success) {
        setData(response.data);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle title="Transactions" />

        <div className="flex gap-1">
          <button
            className="primary-outlined-btn"
            onClick={() => setShowDepositModal(true)}
          >
            Deposit
          </button>
          <button
            className="primary-contained-btn"
            onClick={() => setShowTranferFundsModel(true)}
          >
            Transfer{" "}
          </button>
        </div>
      </div>
      <Table columns={columns} dataSource={data} className="mt-2" />

      {showTransferFundsModel && (
        <TransferFundsModel
          showTransferFundsModel={showTransferFundsModel}
          setShowTransferFundsModel={setShowTranferFundsModel}
          reloadData={getData}
        />
      )}

      {showDepositModal && (
        <DepositModal
          showDepositModal={showDepositModal}
          setShowDepositModal={setShowDepositModal}
          reloadData={getData}
        />
      )}
    </div>
  );
}

export default Transactions;
