import React, { Fragment } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, Form, Row } from 'reactstrap';

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
          <Form>
            <Row>{props.checkboxes}</Row>
            <Row>
              <button>Apply</button>
            </Row>
          </Form>
        </DropdownMenu>
      </Dropdown>
    </Fragment>
  );
};

export default Filters;
