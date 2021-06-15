import React from "react";
import { connect } from "react-redux";
import { addItemAction } from "../../actions";
import styled from "styled-components";
import Input from "../input/input";
import Button from "../button/button";
import { Formik, Form } from "formik";

const StyledWrapper = styled.div`
  z-index: 99;
  position: fixed;
  background-color: blanchedalmond;
  width: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled(Input)`
  max-width: 100px;
  margin-top: 20px;
  :nth-child(5) {
    margin-bottom: 20px;
  }
`;

const StyledButton = styled(Button)`
  max-width: 100px;
  margin-bottom: 20px;
`;

const ReservationForm = ({
  currentTable,
  timeFrom,
  timeTo,
  date,
  addItem,
  visible,
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
          {errors.people && touched.people && errors.people}
          <StyledButton type="submit" disabled={isSubmitting}>
            Zarezerwuj
          </StyledButton>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(ReservationForm);
