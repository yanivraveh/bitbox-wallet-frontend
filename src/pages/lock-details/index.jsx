import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Input, Button } from "../../components";
import MainBodyContainer from "../../components/containers/main-body-container";
import api from "../../api";
import moment from "moment";

const LockDetailsPage = () => {
  const { state } = useLocation();
  const { id } = useParams();

  const [model, setModel] = useState({
    recepientId: "",
    type: "",
    amount: "",
    endDate: "",
    timeLeft: "",
    status: "Waiting",
  });

  const LOCK_STATUS = {
    1: "Waiting",
    2: "Ready",
  };

  useEffect(() => {
    // Fetch lock details from the API
    api
      .getLockById(id)
      .then((res) => {
        console.log("res", res);
        // Update the model state with the fetched data
        setModel((currentModel) => ({
          ...res.data,
          endDate: moment.unix(res.data.endDate).format("DD/MM/YYYY"),
          timeLeft: `${moment.unix(res.data.endDate).diff(moment(), "d")} days`,
          status: LOCK_STATUS[res.data.status] || LOCK_STATUS.waiting,
        }));
      })
      .catch((err) => console.error(err));
  }, [id]);

  // this function is not used but is here to remove warning from console
  const handleInputChange = (e, key) => {};

  return (
    <MainBodyContainer>
      <section className="gap-4 flex-column padding-top-16">
        <Input disabled={true} label="Buyer" value={model.recepientId} />
        <Input
          label="Amount"
          value={model.amount}
          onChange={(e) => handleInputChange(e, "amount")}
        />
        <Input disabled={true} label="Time for lock" value={model.endDate} />
        <Input disabled={true} label="Time left" value={model.timeLeft} />
        <section className="transaction-status frame2">
          <p className="body2 text-secondary frame2-content">
            Status: <span className="body1 text-purple">{model.status}</span>
          </p>
        </section>
      </section>
    </MainBodyContainer>
  );
};

export default LockDetailsPage;
