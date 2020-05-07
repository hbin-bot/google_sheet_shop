import React, { Component } from 'react'
import { Button, Form, Input, Header, Icon, Modal, Grid, Table, Label } from 'semantic-ui-react'

class ContactForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      address: '',
      city: '',
      province: '',
      zipcode: '',
      message: '',
      orders: props,
      totalPrice: 0.0,
      totalItem: 0,
      status: 'start'
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)

    const {orderData} = this.props;

    if (orderData.length > 0) {
      orderData.map((item,i) => {
        this.state.totalPrice = this.state.totalPrice + item.quantity * item.price
        this.state.totalItem = this.state.totalItem + item.quantity
      })
    }
  }
  onChange(event) {
    const target = event.target
    const name = target.name
    const value = target.value

    this.setState({
      [name]: value
    })
  }
  onSubmit(event) {
    event.preventDefault()
    fetch('https://571i9zqek1.execute-api.us-east-1.amazonaws.com/dev/sendEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(this.state)
    })
    .then((response) => {
      if (response.status == 200) {
        this.setState({status : 'success'});
      }
      else {
        this.setState({status : 'error'});
      }
    })
    .catch((error) => {
      console.error(error);
      this.setState({status : 'error'});
    })
  }
  renderItems() {
    const {orderData} = this.props
    return orderData.map((item,i) => (
      <Table.Row key={i}>
        <Table.Cell>{item.name}</Table.Cell>
        <Table.Cell>{item.quantity}</Table.Cell>
        <Table.Cell>{item.price}</Table.Cell>
      </Table.Row>
    ))
  }
  render() {
    var errorMessage

    if (this.state.status == 'error') {
      errorMessage = (<Header content='Something is wrong! Please check it again.' textAlign={'center'} as='h3'  color={'red'} />)
    }

    var topForm

    if (this.state.status != 'success') {
      topForm = (
        <Form onSubmit={this.onSubmit}>
          {errorMessage}

          <Form.Group widths='equal'>
            <Form.Field>
              <Label htmlFor="name">Name:</Label>
              <Input
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.onChange}
              />
            </Form.Field>
            <Form.Field>
              <Label htmlFor="email">Email:</Label>
              <Input
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.onChange}
              />
            </Form.Field>
          </Form.Group>

          <Form.Field>
            <Label htmlFor="address">Street address:</Label>
            <Input
              type="text"
              name="address"
              value={this.state.address}
              onChange={this.onChange}
            />
          </Form.Field>

          <Form.Group widths='equal'>
            <Form.Field>
              <Label htmlFor="city">Town/City:</Label>
              <Input
                type="text"
                name="city"
                value={this.state.city}
                onChange={this.onChange}
              />
            </Form.Field>

            <Form.Field>
              <Label htmlFor="province">Province:</Label>
              <Input
                type="text"
                name="province"
                value={this.state.province}
                onChange={this.onChange}
              />
            </Form.Field>

            <Form.Field>
              <Label htmlFor="zipcode">Postal code:</Label>
              <Input
                type="text"
                name="zipcode"
                value={this.state.zipcode}
                onChange={this.onChange}
              />
            </Form.Field>
          </Form.Group>

          <Form.Field>
            <Label>Message (optional):</Label>
            <textarea
              name="message"
              value={this.state.message}
              onChange={this.onChange}
              rows="2"
            />
          </Form.Field>

          <Grid>
            <Grid.Column textAlign="center">
              <Button color="google plus" type="submit">Send Order</Button>
            </Grid.Column>
          </Grid>
        </Form>
      )
    }
    else {
      topForm = (
        <Header content='Your order is sent successfully! We will contact you very soon.' textAlign={'center'} as='h3' color={'green'}/>
      )
    }

    var bottomTable

    if (this.state.totalItem > 0) {
      bottomTable = (

        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Product</Table.HeaderCell>
              <Table.HeaderCell>Quantity</Table.HeaderCell>
              <Table.HeaderCell>Price</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.renderItems()}
            <Table.Row>
              <Table.Cell></Table.Cell>
              <Table.Cell>In Total</Table.Cell>
              <Table.Cell>{this.state.totalPrice}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      )
    }
    else {
      bottomTable = (<p> No items are selected yet </p>)
    }

    return (
      <Grid divided='vertically'>
        <Grid.Row columns={1}>
          <Grid.Column>
            {topForm}
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1}>
          <Grid.Column>
            <Header content='Order Details:' textAlign={'left'} as='h3'/>
            {bottomTable}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default ContactForm