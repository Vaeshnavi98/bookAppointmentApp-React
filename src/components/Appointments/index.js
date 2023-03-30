import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    appointmentList: [],
    inputTitle: '',
    inputDate: '',
    buttonActive: false,
  }

  onFilter = () => {
    const {buttonActive} = this.state

    this.setState({
      buttonActive: !buttonActive,
    })
  }

  getFilteredAppointmentsList = () => {
    const {appointmentList, buttonActive} = this.state

    if (buttonActive) {
      return appointmentList.filter(
        eachTransaction => eachTransaction.isStarred === true,
      )
    }
    return appointmentList
  }

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {inputTitle, inputDate} = this.state

    const newAppointment = {
      id: uuidv4(),
      title: inputTitle,
      date: inputDate,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      inputTitle: '',
      inputDate: '',
    }))
  }

  onChangeTitle = event => {
    this.setState({inputTitle: event.target.value})
  }

  onChangeDate = event => {
    this.setState({inputDate: event.target.value})
  }

  render() {
    const {inputTitle, inputDate, buttonActive} = this.state
    const filterClassName = buttonActive ? 'filter-filled' : 'filter-empty'
    const filteredAppointmentsList = this.getFilteredAppointmentsList()

    return (
      <div className="main-div">
        <div className="background">
          <h1>Add Appointment</h1>
          <div className="div-deco">
            <form onSubmit={this.onAddAppointment}>
              <label htmlFor="title">TITLE</label>
              <br />
              <input
                id="title"
                type="text"
                placeholder="Title"
                className="input-deco"
                onChange={this.onChangeTitle}
                value={inputTitle}
              />
              <br />
              <label htmlFor="date">DATE</label>
              <br />
              <input
                id="date"
                type="date"
                className="input-deco"
                onChange={this.onChangeDate}
                value={inputDate}
              />
              <br />
              <button type="submit" className="button-deco">
                Add
              </button>
              <br />
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="img-deco"
            />
          </div>
          <hr />
          <div className="ul-div1">
            <h2 className="para-deco">Appointments</h2>
            <button
              className={`filter-style ${filterClassName}`}
              onClick={this.onFilter}
              type="button"
            >
              Starred
            </button>
          </div>
          <ul className="li-div">
            {filteredAppointmentsList.map(eachAppointment => (
              <AppointmentItem
                key={eachAppointment.id}
                appointmentDetails={eachAppointment}
                toggleIsStarred={this.toggleIsStarred}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
