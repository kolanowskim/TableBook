import axios from "axios";
export const setCurrentTable = (table) => {
  return {
    type: "CURRENTTABLE",
    payload: table,
  };
};
export const fetchTablesAction = (date) => (dispatch) => {
  dispatch({ type: "FETCH_REQUEST" });

  return axios
    .get(
      `http://api-tablebook.kolanowskim.pl/bookings/getOneDayBookings/idRestaurant/1/bookingDate/${date}`
    )
    .then(({ data }) => {
      dispatch({
        type: "FETCHTABLES",
        payload: { data },
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addItemAction =
  ({ table, timeFrom, timeTo, date, people }) =>
  (dispatch) => {
    dispatch({ type: "ADD_TABLE_REQUEST" });
    const tableNumber = table.replace(/\D/g, "");
    return axios
      .post(`http://api-tablebook.kolanowskim.pl/bookings/create`, {
        id_restaurant: 1,
        id_user: 2,
        booking_date: date,
        from_hour: timeFrom,
        to_hour: timeTo,
        table_number: tableNumber,
        how_many_people: people,
      })
      .then(({ data }) => {
        dispatch({
          type: "ADD_TABLE_SUCCESS",
          payload: { data, table },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
