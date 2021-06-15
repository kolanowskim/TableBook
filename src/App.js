import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { fetchTablesAction } from "./actions";
import Input from "./components/input/input";
import Table from "./components/table/table";
import Button from "./components/button/button";
import ReservationForm from "./components/Form/ReservationForm";

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

function App({ fetchTables, currentTable, tables }) {
  const [date, setDate] = useState("");
  const [timeFrom, setTimeFrom] = useState("");
  const [timeTo, setTimeTo] = useState("");
  const [timeFrom_toDate, setTimeFrom_toDate] = useState(new Date());
  const [timeTo_toDate, setTimeTo_toDate] = useState(new Date());
  const [hiddenTables, setHiddenTables] = useState(true);
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
      } else {
        setalert1hReservation(false);
      }
    }
  }, [timeFrom, timeTo]);

  useEffect(() => {
    fetchTables(date.date);
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
          min="12:00"
          max="22:30"
          onFocus={(e) => (e.target.type = "time")}
          onBlur={((e) => (e.target.type = "text"), onChangeTimeFrom)}
        />
        <StyledP>doGodz</StyledP>
        <StyledInput
          type="text"
          name="timeTo"
          placeholder="do godziny"
          min="12:30"
          max="23:00"
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
              <Table
                key={tableNr}
                name={tableNr}
                array={object}
                tFromInput={timeFrom_toDate.timeFrom_toDate}
                tToInput={timeTo_toDate.timeTo_toDate}
                day={date.date}
              >
                {tableNr}
              </Table>
            );
          })
        )}
      </StyledTablesWrapper>
      {!hiddenTables && (
        <div>
          {currentTable ? (
            <Button
              onClick={() => {
                setVisibilityReservationForm(true);
              }}
            />
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
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
