import React from 'react';
import Select from 'react-select';
import { Row, Col } from 'reactstrap';

class CustomizableSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      singleSelect: null,
      multipleSelect: null
    };
  }
  render() {
    return (
      <>
        <Row>
          <Col lg="5" md="6" sm="3">
            <Select
              className="react-select primary"
              classNamePrefix="react-select"
              name="singleSelect"
              value={this.state.singleSelect}
              onChange={value => this.setState({ singleSelect: value })}
              options={[
                {
                  value: '',
                  label: 'Single Option',
                  isDisabled: true
                },
                { value: '2', label: 'Foobar' },
                { value: '3', label: 'Is great' }
              ]}
              placeholder="Single Select"
            />
          </Col>
          <Col lg="5" md="6" sm="3">
            <Select
              className="react-select info"
              classNamePrefix="react-select"
              placeholder="Choose City"
              name="multipleSelect"
              closeMenuOnSelect={false}
              isMulti
              value={this.state.multipleSelect}
              menuShouldBlockScroll={true}
              onChange={value => this.setState({ multipleSelect: value })}
              options={[
                {
                  value: '',
                  label: ' Multiple Options',
                  isDisabled: true
                },
                { value: '2', label: 'Paris ' },
                { value: '3', label: 'Bucharest' },
                { value: '4', label: 'Rome' },
                { value: '5', label: 'New York' },
                { value: '6', label: 'Miami ' },
                { value: '7', label: 'Piatra Neamt' },
                { value: '8', label: 'Paris ' },
                { value: '9', label: 'Bucharest' },
                { value: '10', label: 'Rome' },
                { value: '11', label: 'New York' },
                { value: '12', label: 'Miami ' },
                { value: '13', label: 'Piatra Neamt' },
                { value: '14', label: 'Paris ' },
                { value: '15', label: 'Bucharest' },
                { value: '16', label: 'Rome' },
                { value: '17', label: 'New York' },
                { value: '18', label: 'Miami ' },
                { value: '19', label: 'Piatra Neamt' }
              ]}
            />
          </Col>
        </Row>
      </>
    );
  }
}

export default CustomizableSelect;
