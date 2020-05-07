import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Segment, Header } from 'semantic-ui-react';

class Footer extends Component {
  render(){
    return (
      <Segment
        textAlign={'center'}
      >
        <Header content='If you have any question, please send email to xxx@gmail.com' textAlign={'center'} as='h5' />
      </Segment>
    )
  }
}

export default Footer;
