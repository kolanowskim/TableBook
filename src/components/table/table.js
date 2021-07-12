import React from "react";
import { connect } from "react-redux";
import { setCurrentTable } from "../../actions";
import "./table.css";

const Table = ({ children, array, tFromInput, tToInput, day, setTable }) => {
  const timeCheck = array.find(({ from_hour, to_hour }) => {
    const tFrom = new Date(`${day} ${from_hour}`).getTime();
    const tTo = new Date(`${day} ${to_hour}`).getTime();
    if (tToInput > tFrom && tToInput < tTo) {
      return true;
    } else if (tFromInput > tFrom - 3600000 && tFromInput < tTo) {
      return true;
    } else if (tFromInput < tFrom && tToInput > tFrom) {
      return true;
    } else {
      return false;
    }
  });

  const setCurrentTableClick = (e) => {
    if (document.querySelector(".tableClicked")) {
      document.querySelector(".tableClicked").classList.remove("tableClicked");
    }
    setTable(e.target.textContent);
    e.target.classList.add("tableClicked");
  };

  return (
    <>
      <div
        id={children}
        className={timeCheck ? "tableReserved" : "table"}
        onClick={timeCheck ? null : (e) => setCurrentTableClick(e)}
      >
        {children}
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setTable: (table) => dispatch(setCurrentTable(table)),
});

export default connect(null, mapDispatchToProps)(Table);
