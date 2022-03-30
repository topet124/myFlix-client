import React from 'react';

export class UserInfo extends React.Component {
    render() {
        const { Email, Name, Username, Birthday } = this.props;

        return (
            <div>
                <p className="mb-4">Username: {Name}</p>
                <p className="mb-4">e-mail: {Email}</p>
                <p className="mb-4">Birthday: {Birthday}</p>
            </div>
        );
    }
}