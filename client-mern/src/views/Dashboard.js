import { PostContext } from "../contexts/postContext";
import { AuthContext } from "../contexts/AuthContext";
import { useContext, useEffect } from "react";
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Toast from 'react-bootstrap/Toast';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import CardHeader from "react-bootstrap/esm/CardHeader";
import SlinglePost from "../components/posts/SlinglePost";
import AddPostModal from "../components/posts/AddPostModal";
import addIcon from '../assets/plus-circle-fill.svg';
import UpdatePostModal from "../components/posts/UpdatePostModal";

const Dashboard = () => {
    // contexts
    const {authState:{
        user:{username}
    }}= useContext(AuthContext)
    const {
        postState: {post, posts, postsLoading},
        getPosts,
        setShowAddPostModal,
        showToast: {show, message, type},
        setShowToast
    } = useContext(PostContext)
    // Start: get all posts
    useEffect(()=> getPosts(), [])
    let body = null

    if(postsLoading){
        body=(
            <div className="spinner container">
                <Spinner animation="border" variant="info"/>
            </div>
        )
    }else if(posts.length === 0){
        body=(
            <Card className="text-center mx-5 my-5">
                <CardHeader as="h1">Hi{username}</CardHeader>
                <Card.Body>
                    <Card.Title>Welcome to learnIt</Card.Title>
                    <Card.Text>
                        Click the button to track your first skill to learn 
                    </Card.Text>
                    <Button variant="primary" onClick={setShowAddPostModal.bind(this, true)}>LeanrIt</Button>
                </Card.Body>
            </Card>
        )
    } else {
        body=(
            <>
                <Row className="row-col-1 row-cols-md-3 g-4 mx-auto mt-3">
                    {posts.map((post, index)=>(
                        <Col key={index} className="my-2">
                            <SlinglePost post={post}/>
                        </Col>
                    ))}
                </Row>
            {/* Open Add Post Modal */}
            <OverlayTrigger placement="left" overlay={<Tooltip>Add a new thing to learn</Tooltip>}>
                <Button className="btn-floating" onClick={setShowAddPostModal.bind(this, true)}>
                    <img src={addIcon} alt="add-post" width='60' height='60'/>
                </Button>
            </OverlayTrigger>
            </>

        )
    }
    return <>
        {body}
        <AddPostModal/>
        {post !== null && <UpdatePostModal/>}
        {/* After post is added, show toast */}
        <Toast 
            show={show} 
            style={{position:'fixed', top: '20%', right: '10px'}} 
            className={`bg-${type} text-white`}
            onClose={setShowToast.bind(this, {
                show: false,
                message: '',
                type: null
            })}
            delay={3000}
            autohide
        >
            <Toast.Body>
                <strong>{message}</strong>
            </Toast.Body>
        </Toast>
    </>
};

export default Dashboard;