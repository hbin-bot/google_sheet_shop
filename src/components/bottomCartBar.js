import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Segment , Button , Icon , Header , Transition, Modal } from 'semantic-ui-react';
import ContactForm from './contactForm';

class BottomCartBar extends Component {
	constructor(props){
		super(props);
		this.state = {
			status : true,
			disableButton : false
		};
	}
	shouldComponentUpdate(nextProps,nextState){
		const { cart , layout } = this.props;
		const { status } = this.state;
		return JSON.stringify(cart) !== JSON.stringify(nextProps.cart) || layout !== nextProps.layout || nextState.status !== status;
	}
	componentDidUpdate(prevProps, prevState,snapshot){
		const { cart } = this.props;
		if(cart.length>=1) this.setState({ status : !prevState.status });
	}
	styleSetting(layout){
		let barStyle = {
			backgroundColor : 'white',
			width : '95%',
			margin : '10px'
		};
		Object.keys(layout).map((property)=>{
			if(layout[property] !== null && layout[property] !== undefined){
				let thisValue = layout[property];
				switch(property){
					case 'barBottomColor':
						barStyle.backgroundColor = thisValue;
					break;
					case 'barBottomHeight':
						barStyle.padding = `${thisValue}vh 5px`;
					break;
				}
			}
		});
		return {
			bar : barStyle
		};
	}
	cartCalculator(cart){
		let quantity = 0;
		let price = 0;
		cart.map((item)=> {
			quantity += item.quantity
			price += item.quantity * item.price;
		});

		if (quantity > 0) {
			this.state.disableButton = false
		}
		else {
			this.state.disableButton = true
		}

		return { quantity : quantity , price : price } ;
	}
	render(){
		const { layout , cart } = this.props;
		const { status } = this.state;
		const renderStyle = this.styleSetting(layout);
		const total = this.cartCalculator(cart);

		return (layout.currency !== undefined) ? (
			<Segment
				style={renderStyle.bar}
				textAlign={'center'}
			>
				<Header
					as='h2'
					floated="left"
					textAlign="center"
					style={{ margin : '5px'}}
				>
					<Icon name='tag' />
					<Header.Content>
						{`$${total.price} ${layout.currency}`}
					</Header.Content>
				</Header>
				<Modal trigger={
					<Button
						icon
						size={'big'}
						labelPosition='right'
						style={{ margin : '0px 10px'}}
						floated='right'
						color='green'
						disabled={this.state.disableButton}
						>
						<Icon name='cart'/>
						{`Checkout (${total.quantity})`}
					</Button>
				} closeIcon size={'large'} className='modalStyle'>
					<Header content='Checkout' textAlign={'center'} as='h1' subheader = 'Please fill the following questions, and your order will be sent to us immediately. We will contact you to process the payment once we receive your order.'/>
		      <Modal.Content>
		      	<ContactForm orderData={cart}/>
		      </Modal.Content>
				</Modal>
			</Segment>
		) : null;
	}
}

function mapStateToProps(state){
	return {
		cart : state.products.cart
	}
};

export default connect(mapStateToProps,null)(BottomCartBar);
