import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import GlobalStyle from "./theme/globalStyle";
import { fetchTablesAction, setCurrentTable } from "./actions";
import Input from "./components/input/input";
import Table from "./components/table/table";
import Button from "./components/button/button";
import ReservationForm from "./components/ReservationForm/ReservationForm";

const StyledWrapper = styled.div`
  position: relative;
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledInputsWrapper = styled.div`
  display: flex;
  margin-bottom: 40px;
`;

const StyledDataInput = styled.div``;
const StyledFromHourInput = styled.div``;
const StyledToHourInput = styled.div``;

const StyledInput = styled(Input)`
  margin: 7px 20px 0 0;
  cursor: pointer;
`;

const StyledButton = styled(Button)`
  padding: 7px 17px 7px 17px;
  font-size: 20px;
`;

const StyledP = styled.p`
  margin: 0;
`;

const StyledTablesWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  height: 220px;
  width: 830px;
  background-color: #fac05e;
  box-shadow: rgba(0, 0, 0, 0.75) 0px 0px 10px;
  padding: 15px;
  div:nth-child(1),
  div:nth-child(4),
  div:nth-child(7),
  div:nth-child(10) {
    margin-bottom: auto;
  }
  div:nth-child(3),
  div:nth-child(6),
  div:nth-child(9) {
    margin-top: auto;
  }
`;

const StyledMessagesWrapper = styled.div`
  margin-top: 40px;
  height: 20px;
  font-size: 20px;
  font-weight: bold;
`;
const StyledMessages = styled.div``;

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
  const [alertAllReserved, setalertAllReserved] = useState(false);

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
    allReserved();
    if (document.getElementById(currentTable)) {
      if (document.getElementById(currentTable).className === "tableReserved") {
        setTable("");
      }
    }
  });

  useEffect(() => {
    if (timeFrom && timeTo) {
      setHiddenTables(false);
      if (timeTo_toDate - timeFrom_toDate < 3600000) {
        setalert1hReservation(true);
        setcommentBelow(false);
        setTable("");
      } else {
        setalert1hReservation(false);
        setcommentBelow(true);
      }
    }
    allReserved();
  }, [timeFrom, timeTo]);

  useEffect(() => {
    setTimeFrom_toDate(new Date(`${date} ${timeFrom}`).getTime());
    setTimeTo_toDate(new Date(`${date} ${timeTo}`).getTime());
    fetchTables(date);
  }, [date]);

  const allReserved = () => {
    let numberOfReserved = document.querySelectorAll(".tableReserved").length;
    if (numberOfReserved > 0) {
      let lengthOfTables = Object.keys(tables).length;
      if (numberOfReserved === lengthOfTables) {
        setTable("");
        setalertAllReserved(true);
      } else {
        setalertAllReserved(false);
      }
    }
  };

  const onChangeDay = (event, day) => {
    setDate(day ? day : event.target.value);
  };
  const onChangeTimeFrom = (event) => {
    setTimeFrom(event.target.value);
    setTimeFrom_toDate(new Date(`${date} ${event.target.value}`).getTime());
  };
  const onChangeTimeTo = (event) => {
    setTimeTo(event.target.value);
    setTimeTo_toDate(new Date(`${date} ${event.target.value}`).getTime());
  };

  return (
    <StyledWrapper>
      <GlobalStyle />
      <StyledInputsWrapper>
        <StyledDataInput>
          <StyledP>Dzie??</StyledP>
          <StyledInput
            type="text"
            name="date"
            placeholder={date}
            onFocus={(e) => (e.target.type = "date")}
            onBlur={((e) => (e.target.type = "text"), onChangeDay)}
          />
        </StyledDataInput>
        <StyledFromHourInput>
          <StyledP>Od godziny</StyledP>
          <StyledInput
            type="text"
            name="timeFrom"
            placeholder="od godziny"
            onFocus={(e) => (e.target.type = "time")}
            onBlur={((e) => (e.target.type = "text"), onChangeTimeFrom)}
          />
        </StyledFromHourInput>
        <StyledToHourInput>
          <StyledP>Do godziny</StyledP>
          <StyledInput
            type="text"
            name="timeTo"
            placeholder="do godziny"
            onFocus={(e) => (e.target.type = "time")}
            onBlur={((e) => (e.target.type = "text"), onChangeTimeTo)}
          />
        </StyledToHourInput>
      </StyledInputsWrapper>
      <StyledTablesWrapper>
        {alert1hReservation ? (
          <StyledP>Rezerwacja na minimum 1h</StyledP>
        ) : hiddenTables ? (
          <StyledP>Podaj godzin?? od i do</StyledP>
        ) : (
          date &&
          Object.keys(tables).map((tableNr) => {
            let object = tables[tableNr];
            return (
              <StyledTable
                key={tableNr}
                name={tableNr}
                array={object}
                tFromInput={timeFrom_toDate}
                tToInput={timeTo_toDate}
                day={date}
              >
                {tableNr}
              </StyledTable>
            );
          })
        )}
      </StyledTablesWrapper>
      <StyledMessagesWrapper>
        {commentBelow && (
          <StyledMessages>
            {currentTable ? (
              <StyledButton
                className="reserve"
                onClick={() => {
                  setVisibilityReservationForm(true);
                }}
              >
                Zarezerwuj
              </StyledButton>
            ) : alertAllReserved ? (
              <StyledP>
                Niestety wszystkie stoliki s?? zarezerwowane w tym czasie
              </StyledP>
            ) : (
              <StyledP>Wybierz zielony-wolny stolik aby zarezerwowa??</StyledP>
            )}
          </StyledMessages>
        )}
      </StyledMessagesWrapper>
      {VisibilityReservationForm ? (
        <ReservationForm
          date={date}
          timeFrom={timeFrom}
          timeTo={timeTo}
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
