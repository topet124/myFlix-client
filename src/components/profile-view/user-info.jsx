import React from 'react';

export class UserInfo extends React.Component {
    dateformat(date){
        
        let newdate = new Date(date)
        return newdate.toISOString().slice(0,10);
    }
    render() {
        const { email, name, birthday } = this.props;

        return (
            <div>
                <p className="mb-4">Username: {name}</p>
                <p className="mb-4">e-mail: {email}</p>
                <p className="mb-4">Birthday: {this.dateformat(birthday)}</p>
            </div>
        );
    }
}