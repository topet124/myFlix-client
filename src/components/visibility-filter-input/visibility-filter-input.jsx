import React from "react";
import { connect } from "react-redux";
import { setFilter } from "../../actions/actions";
import Form from "react-bootstrap/Form";

import "./visibility-filter.scss";

function VisibilityFilterInput(props) {
  return <input
        className='visibility-filter'
        onChange={e => props.setFilter(e.target.value)}
        value={props.visibilityFilter}
        placeholder='Search-Movies'
    />
}


export default connect(null, { setFilter })(VisibilityFilterInput);
