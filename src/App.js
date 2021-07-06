import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { fetchTablesAction, setCurrentTable } from "./actions";
import Input from "./components/input/input";
import Table from "./components/table/table";
import Button from "./components/button/button";
import ReservationForm from "./components/ReservationForm/ReservationForm";

const StyledWrapper = styled.div`
  position: relative;
  height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledInputsWrapper = styled.div`
  display: flex;
`;

const StyledInput = styled(Input)`
  display: inline-block;
  text-align: center;
  width: 130px;
  margin: 15px 5px 0px 5px;
  height: 20px;
`;

const StyledButton = styled(Button)`
  padding: 5px 15px 5px 15px;
`;

const StyledP = styled.p`
  margin: 20px 0 0 0;
`;

const StyledTablesWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  height: 120px;
`;

const StyledTable = styled(Table)``;

function App({ fetchTables, currentTable, tables, setTable }) {
  const [date, setDate] = useState("");
  const [timeFrom, setTimeFrom] = useState("");
  const [timeTo, setTimeTo] = useState("");
  const [timeFrom_toDate, setTimeFrom_toDate] = useState(new Date());
  const [timeTo_toDate, setTimeTo_toDate] = useState(new Date());
  const [hiddenTables, setHiddenTables] = useState(true);
  const [commentBelow, setcommentBelow] = useState(false);
  const [VisibilityReservationForm, setVisibilityReservationForm] =
    useState(false);
  const [alert1hReservation, setalert1hReservation] = useState(false);

  useEffect(() => {
    if (date === "") {
      let today = new Date();
      const day = String(today.getDate()).padStart(2, "0");
      const month = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      const year = today.getFullYear();
      today = year + "-" + month + "-" + day;
      onChangeDay(null, today);
      fetchTables(today);
    }
  });

  useEffect(() => {
    if (timeFrom && timeTo) {
      setHiddenTables(false);
      if (
        timeTo_toDate.timeTo_toDate - timeFrom_toDate.timeFrom_toDate <
        3600000
      ) {
        setalert1hReservation(true);
        setcommentBelow(false);
        setTable("");
      } else {
        setalert1hReservation(false);
        setcommentBelow(true);
      }
    }
  }, [timeFrom, timeTo]);

  useEffect(() => {
    setTimeFrom_toDate({
      timeFrom_toDate: new Date(`${date.date} ${timeFrom.timeFrom}`).getTime(),
    });
    setTimeTo_toDate({
      timeTo_toDate: new Date(`${date.date} ${timeTo.timeTo}`).getTime(),
    });
    console.log(timeFrom_toDate.timeFrom_toDate, timeTo_toDate.timeTo_toDate);
  }, [date]);

  const onChangeDay = (event, day) => {
    setDate({ date: day ? day : event.target.value });
  };
  const onChangeTimeFrom = (event) => {
    setTimeFrom({ timeFrom: event.target.value });
    setTimeFrom_toDate({
      timeFrom_toDate: new Date(`${date.date} ${event.target.value}`).getTime(),
    });
  };
  const onChangeTimeTo = (event) => {
    setTimeTo({ timeTo: event.target.value });
    setTimeTo_toDate({
      timeTo_toDate: new Date(`${date.date} ${event.target.value}`).getTime(),
    });
  };

  return (
    <StyledWrapper>
      <StyledInputsWrapper>
        <StyledInput
          type="text"
          name="date"
          placeholder={date.date}
          onFocus={(e) => (e.target.type = "date")}
          onBlur={((e) => (e.target.type = "text"), onChangeDay)}
        />
        <StyledP>odGodz</StyledP>
        <StyledInput
          type="text"
          name="timeFrom"
          placeholder="od godziny"
          onFocus={(e) => (e.target.type = "time")}
          onBlur={((e) => (e.target.type = "text"), onChangeTimeFrom)}
        />
        <StyledP>doGodz</StyledP>
        <StyledInput
          type="text"
          name="timeTo"
          placeholder="do godziny"
          onFocus={(e) => (e.target.type = "time")}
          onBlur={((e) => (e.target.type = "text"), onChangeTimeTo)}
        />
      </StyledInputsWrapper>
      <StyledTablesWrapper>
        {alert1hReservation ? (
          <StyledP>Rezerwacja na minimum 1h</StyledP>
        ) : hiddenTables ? (
          <StyledP>Podaj godzinę od i do</StyledP>
        ) : (
          date &&
          Object.keys(tables).map((tableNr) => {
            let object = tables[tableNr];

            return (
              <StyledTable
                key={tableNr}
                name={tableNr}
                array={object}
                tFromInput={timeFrom_toDate.timeFrom_toDate}
                tToInput={timeTo_toDate.timeTo_toDate}
                day={date.date}
              >
                {tableNr}
              </StyledTable>
            );
          })
        )}
      </StyledTablesWrapper>
      {commentBelow && (
        <div>
          {currentTable ? (
            <StyledButton
              className="reserve"
              onClick={() => {
                setVisibilityReservationForm(true);
              }}
            >
              Zarezerwuj
            </StyledButton>
          ) : (
            <StyledP>Wybierz zielony-wolny stolik aby zarezerwować</StyledP>
          )}
        </div>
      )}

      {VisibilityReservationForm ? (
        <ReservationForm
          date={date.date}
          timeFrom={timeFrom.timeFrom}
          timeTo={timeTo.timeTo}
          visible={setVisibilityReservationForm}
        />
      ) : null}
    </StyledWrapper>
  );
}

const mapStateToProps = (state) => {
  const { currentTable } = state;
  const { tables } = state;
  return { currentTable, tables };
};

const mapDispatchToProps = (dispatch) => ({
  fetchTables: (date) => dispatch(fetchTablesAction(date)),
  setTable: (table) => dispatch(setCurrentTable(table)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
