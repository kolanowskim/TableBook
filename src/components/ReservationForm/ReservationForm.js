import React from "react";
import { connect } from "react-redux";
import { addItemAction, setCurrentTable } from "../../actions";
import styled from "styled-components";
import Input from "../input/input";
import Button from "../button/button";
import { Formik, Form } from "formik";
import xIcon from "../../assets/x.svg";

const StyledWrapper = styled.div`
  z-index: 99;
  position: absolute;
  background-color: #f79d84;
  width: 900px;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledInput = styled(Input)`
  max-width: 100px;
  margin-top: 20px;
  :nth-child(5) {
    margin-bottom: 20px;
    cursor: pointer;
  }
`;

const StyledMessage = styled.div`
  height: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const StyledButton = styled(Button)`
  padding: 7px 17px 7px 17px;
  font-size: 20px;
`;
const StyledButtonIcon = styled(Button)`
  position: absolute;
  left: 94%;
  bottom: 88%;
`;

function onClickIcon() {
  if (document.querySelector(".tableClicked")) {
    document.querySelector(".tableClicked").classList.remove("tableClicked");
  }
}

const ReservationForm = ({
  currentTable,
  timeFrom,
  timeTo,
  date,
  addItem,
  visible,
  setTable,
}) => (
  <StyledWrapper visible={visible}>
    <h1>Rezerwacja stolika</h1>
    <Formik
      initialValues={{
        table: currentTable,
        timeFrom: timeFrom,
        timeTo: timeTo,
        email: "",
        date: date,
        people: "",
      }}
      validate={(values) => {
        const errors = {};
        if (!values.people) {
          errors.people = "Podaj ilość osób";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        addItem(values);
        visible(false);
        setSubmitting(false);
        setTable("");
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <StyledForm onSubmit={handleSubmit}>
          <StyledInput
            type="text"
            name="table"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.table}
            readOnly
          />
          <StyledInput
            type="text"
            name="date"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.date}
            readOnly
          />
          <StyledInput
            type="text"
            name="timeFrom"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.timeFrom}
            readOnly
          />
          <StyledInput
            type="text"
            name="timeTo"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.timeTo}
            readOnly
          />
          <StyledInput
            type="number"
            name="people"
            placeholder="Ile osób"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.people}
          />
          <StyledMessage>
            {errors.people && touched.people && errors.people}
          </StyledMessage>
          <StyledButton
            className="reserve"
            type="submit"
            disabled={isSubmitting}
          >
            Zarezerwuj
          </StyledButton>
          <StyledButtonIcon
            onClick={() => {
              visible(false);
              setTable("");
              onClickIcon();
            }}
            className="icon"
            icon={xIcon}
          />
        </StyledForm>
      )}
    </Formik>
  </StyledWrapper>
);

const mapStateToProps = (state) => {
  const { currentTable } = state;
  return { currentTable };
};

const mapDispatchToProps = (dispatch) => ({
  addItem: (data) => dispatch(addItemAction(data)),
  setTable: (table) => dispatch(setCurrentTable(table)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReservationForm);
