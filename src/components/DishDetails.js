import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Row, Col, Button,
Label, Modal, ModalHeader, ModalBody} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { Loading } from './Loading';
import { baseURL } from '../shared/baseURL';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len)
const minLength = (len) => (val) => (val) && (val.length >= len)

function RenderDish({ dish }) {
    if (dish) {
        return (
            <FadeTransform in
            transformProps={{
                exitTransform: 'scale(0.5) translateY(-50%)'
            }}>
            <Card>
                <CardImg width="100%" src={baseURL + dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
            </FadeTransform>
        )
    } else {
        return (
            <div></div>
        )
    }
}


function RenderComments({comments, postComment, dishId}) {
    if(comments != null) {
        return(
            <div>
                <ul className="list-unstyled">
                 <Stagger in>
                    {comments.map((comment)=> {
                        return(
                            <Fade in>
                                <li key={comment.id}>
                                <p>{comment.comment}</p>
                                <p>{comment.author} {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' })
                                .format(new Date(Date.parse(comment.date)))}</p>
                                </li>
                            </Fade>
                        )
                    })}
                 </Stagger>
                </ul>
                <CommentForm dishId={dishId} postComment={postComment}/>
            </div>
        )
    }
}

class CommentForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isModalOpen : false
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({ 
            isModalOpen: !this.state.isModalOpen
        })
    }

    handleSubmit(values) {
        //alert(JSON.stringify(values.rating))
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
        //this.toggleModal();
    }
    render() {
        return(
        <div className="container">
           <Button outline onClick={this.toggleModal}>
                <span className="fa fa-pencil fa-lg">Submit Comment</span>
          </Button>
         <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Comment</ModalHeader>
            <ModalBody>
                <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                <Row className="form-group">
                <Label htmlFor="rating" md={2}>Rating</Label>
                <Col>
                <Control.select model=".rating" name="rating"
                                className="form-control" >
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select> 
                </Col>
                </Row>
                <Row className="form-group">
                            <Label htmlFor="name" md={2}>Name</Label>
                            <Col md={10}>
                                <Control.text model=".author" id="name" name="name" 
                                placeholder="Name" 
                                className="form-control"
                                validators= {{
                                    required, minLength : minLength(2), maxLength: maxLength(15)
                                }}
                                />
                                <Errors
                                className="text-danger"
                                model=".author"
                                show="touched"
                                messages={{
                                    required: 'Required',
                                    minLength: 'Must be greater than two characters',
                                    maxLength: 'Must be less than 17 characters'
                                }} />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="message" md={2}>Message</Label>
                            <Col md={10}>
                                <Control.textarea model=".comment" id="message" name="message" rows="8"
                                placeholder="Your message..."
                                className="form-control" />
                            </Col>
                        </Row>
                <Row className="Form-group">
                <Col md={{size: 10, offset: 2}}>
            <Button type="submit" value="submit" color="primary">Submit</Button>
            </Col>
            </Row>
            </LocalForm>
            </ModalBody>
            </Modal>
        </div>          
        )
    }
}

const DishDetail = (props) => {
    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">
                    <Loading/>
                </div>
            </div>
        );
    } else if (props.error) {
        return(
            <div className="container">
                <div className="row">
                    <h5>{props.error}</h5>
                </div>
            </div>
        );
    } else {
        
    const selected = props.dish;
    return (
        <div className="container">
            {selected &&
            <div>
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <h4>Comments</h4>
                        <RenderComments comments={props.comments} 
                        postComment={props.postComment}
                        dishId={props.dish.id} />
                    </div>
                </div>
                </div>
                }

        </div>
    )

}
}

export default DishDetail