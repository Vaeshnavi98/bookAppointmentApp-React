import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails} = props
  const {title, date, isStarred, id} = appointmentDetails

  const onClickToggleIsStarred = () => {
    const {toggleIsStarred} = props
    toggleIsStarred(id)
  }

  const URL = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li>
      <div className="app-deco">
        <p className="title-deco">{title}</p>
        <button type="button" testid="star">
          <img
            src={URL}
            className="start-deco"
            alt="star"
            onClick={onClickToggleIsStarred}
          />
        </button>
      </div>
      <div>
        <p className="date-deco">Date: {date}</p>
      </div>
    </li>
  )
}
export default AppointmentItem
