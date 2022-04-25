import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import From from 'react-bootstrap/Form';
import { useContext, useState } from 'react';
import { PostContext } from '../../contexts/postContext';

const AddPostModal = ()=>{
    // context
    const {showAddPostModal, setShowAddPostModal, addPost, setShowToast} = useContext(PostContext)

    // State
    const [newPost, setNewPost] = useState({
        title: '',
        description: '',
        url: '',
        status: 'TO LEARN',
    })

    const {title, description, url} = newPost

    const onChangeNewPostForm = event =>
        setNewPost({...newPost, [event.target.name]: event.target.value})

    const closeDiaLog = ()=>{
        setNewPost({title: '', description: '', url: '', status: 'TO LEARN'})
        setShowAddPostModal(false)
    }

    const onSubmit = async (event)=>{
        event.preventDefault()
        const {success, message}= await addPost(newPost)
        setNewPost({title: '', description: '', url: '', status: 'TO LEARN'})
        setShowAddPostModal(false)
        setShowToast({show: true, message, type: success ? 'success' : 'danger'})
    }
    return (
        <Modal show={showAddPostModal} onHide={closeDiaLog}>
            <Modal.Header closeButton>
                <Modal.Title>What do you want to learn ?</Modal.Title>
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
                            onChange={onChangeNewPostForm}
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
                            onChange={onChangeNewPostForm}
                        />
                    </From.Group>
                    <br/>
                    <From.Group>
                        <From.Control 
                            type='text' 
                            placeholder='Youtube Tutorial URL' 
                            name='url'
                            value={url} 
                            onChange={onChangeNewPostForm}
                        />
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

export default AddPostModal