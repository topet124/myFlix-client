import React from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';

export class UpdateUser extends React.Component {

    setUsername(input) {
        this.props.setUsername(input)
    }
    setPassword(input) {
        this.props.setPassword(input)
    }
    setEmail(input) {
        this.props.setEmail(input)
    }
    setBirthday(input) {
        this.props.setBirthday(input)
    }


    render() {
        const { user, handleUpdate } = this.props;

        return (
            <Form>
                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label>Username:</Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            defaultValue={user.Username}
                            onChange={(event) => this.setUsername(event.target.value)}
                        />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Password:</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            defaultValue={user.Password}
                            onChange={(event) => this.setPassword(event.target.value)}
                        />
                    </Form.Group>
                </Row>
                <Form.Group className="mb-3">
                    <Form.Label>Email address:</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        defaultValue={user.Email}
                        onChange={(event) => this.setEmail(event.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-2">
                    <Form.Label>Birthday:</Form.Label>
                    <Form.Control
                        type="isDate"
                        name="date"
                        defaultValue={user.Birthday}
                        onChange={(event) => this.setBirthday(event.target.value)}
                    />
                </Form.Group>
                <br />
                <Button type="submit" size="sm" variant="light" onClick={(e) => handleUpdate(e)}>Update Profile</Button>
            </Form >
        );
    }
}