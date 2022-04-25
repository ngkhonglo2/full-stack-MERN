import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import From from 'react-bootstrap/Form';
import { useContext, useEffect, useState } from 'react';
import { PostContext } from '../../contexts/postContext';

const UpdatePostModal = ()=>{
    // context
    const {
        postState: {post},
        showUpdatePostModal,
        setShowUpdatePostModal, 
        updatePost, 
        setShowToast
    } = useContext(PostContext)

    // State
    const [updatedPost, setUpdatedPost] = useState(post)

    const {title, description, url, status} = updatedPost

    const onChangeupdatedPostForm = event =>
        setUpdatedPost({...updatedPost, [event.target.name]: event.target.value})

    const closeDiaLog = ()=>{
        setUpdatedPost(post)
        setShowUpdatePostModal(false)
    }

    const onSubmit = async (event)=>{
        event.preventDefault()
        const {success, message}= await updatePost(updatedPost)
        setUpdatedPost(post)
        setShowUpdatePostModal(false)
        setShowToast({show: true, message, type: success ? 'success' : 'danger'})
    }

    useEffect(()=>{
        setUpdatedPost(post)
    }, [post])
    return (
        <Modal show={showUpdatePostModal} onHide={closeDiaLog}>
            <Modal.Header closeButton>
                <Modal.Title>Making progress?</Modal.Title>
            </Modal.Header>

            <From onSubmit={onSubmit}>
                <Modal.Body>
                    <From.Group>
                        <From.Control 
                            type='text' 
                            placeholder='Title' 
                            name='title' 
                            required aria-describedby='title-help' 
                            value={title} 
                            onChange={onChangeupdatedPostForm}
                        />
                        <From.Text id='title-help' muted>Required</From.Text>
                    </From.Group>
                    <From.Group>
                        <From.Control 
                            as="textarea" 
                            rows={3} 
                            placeholder='Description' 
                            name='description'
                            value={description} 
                            onChange={onChangeupdatedPostForm}
                        />
                    </From.Group>
                    <br/>
                    <From.Group>
                        <From.Control 
                            type='text' 
                            placeholder='Youtube Tutorial URL' 
                            name='url'
                            value={url} 
                            onChange={onChangeupdatedPostForm}
                        />
                    </From.Group>
                    <br/>
                    <From.Group>
                        <From.Control 
                            as='select'
                            value={status}
                            name='status'
                            onChange={onChangeupdatedPostForm}
                        >
                            <option value='TO LEARN'>TO LEARN</option>
                            <option value='LEARNING'>LEARNING</option>
                            <option value='LEARNED'>LEARNED</option>
                        </From.Control>
                    </From.Group>
                </Modal.Body>
                
                <Modal.Footer>
                    <Button variant='secondary' onClick={closeDiaLog}>Cancel</Button>
                    <Button variant='primary' type='submit'>LearnIt!</Button>
                </Modal.Footer>
            </From>
        </Modal>
    )
}

export default UpdatePostModal