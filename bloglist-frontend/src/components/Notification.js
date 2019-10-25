import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  console.log(props)
  if(props.text === '') return null

  return(
    <div className={props.type}>
      {props.text}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    text: state.notification.text,
    type: state.notification.type
  }
}

const ConnectedNotification = connect(
  mapStateToProps
)(Notification)

export default ConnectedNotification