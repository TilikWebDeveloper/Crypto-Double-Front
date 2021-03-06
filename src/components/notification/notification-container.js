import React from 'react';
import { connect } from 'react-redux';

import Notification from './notification';
import {createNotification, removeNotification} from '../../redux/notifications-reducer';

class NotificationContainer extends React.Component {

    constructor(props) {
        super(props);
        this.notify_count = this.props.notifications.length;
    }

    componentDidUpdate(){
        if (this.props.notifications.length > this.notify_count) {
            this.notify_count++;
            
            if (this.props.notifications[0]['auto_close']) {
                setTimeout(() => {
                    this.notify_count--;
                    if (this.props.notifications[0]) {
                        this.props.removeNotification(this.props.notifications[0]['id']);
                    }
                }, 3000);
            }
        }
    }

    render() {
        return (
            <Notification removeNotification={this.props.removeNotification} notifications={this.props.notifications}/>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        notifications: state.notifications
    };
};

export default connect(mapStateToProps, {createNotification, removeNotification})(NotificationContainer);