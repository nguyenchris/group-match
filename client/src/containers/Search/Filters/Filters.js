import React, { Fragment } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, Form, Row, Col } from 'reactstrap';

const Filters = props => {
  return (
    <Fragment>
      <Dropdown isOpen={props.categoriesIsOpen} toggle={() => props.toggleCategories('categories')}>
        <DropdownToggle
          caret
          data-toggle="dropdown"
          className="animation-on-hover"
          color={props.categoriesIsOpen || props.isCategoriesSelected ? 'primary' : 'neutral'}
        >
          Categories
        </DropdownToggle>
        <DropdownMenu>
          <Form className="category-filter">
            <Row>{props.checkboxes}</Row>
            <Row className="category-filter-btn">
              <div className="col-md-3">
                <button className="btn-link text-muted reset">Reset</button>
              </div>
              <div className="col-md-3 ml-auto">
                <button className="btn-link apply">Apply</button>
              </div>
            </Row>
          </Form>
        </DropdownMenu>
      </Dropdown>
    </Fragment>
  );
};

export default Filters;
