import { useState } from "react";
import { useQuery } from "@apollo/client";
import { Container, Card, Button, Row, Col, Form } from "react-bootstrap";
import { GET_USER_POSTS, GET_POSTS } from "../Queries/Queries";
import { useNavigate } from "react-router-dom";

const PostList: React.FC = () => {
    const [userId, setUserId] = useState<number | undefined>(undefined);
    const navigate = useNavigate();

    const { data, loading, error } = useQuery(userId !== undefined ? GET_USER_POSTS : GET_POSTS, {
        variables: userId !== undefined ? { id: userId } : {},
    });

    const posts = userId !== undefined ? data?.user?.posts?.data : data?.posts?.data;

    const handleUserIdChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value ? Number(e.target.value) : undefined;
        setUserId(value);
    };


    if (loading) return <p>Loading...</p>; 
    if (error) return <p>Error: {error.message}</p>;

    return (
        <Container>
            <h1 className="my-4 text-center">Post List</h1> 
            <Button onClick={() => navigate('/create-post')}>
                Create Post
            </Button>
            <Form className="mb-4"> 
                <Form.Group controlId="formUserId"> 
                    <Form.Label>Filter by User ID</Form.Label> 
                    <Form.Control 
                        type="number" 
                        placeholder="Enter User ID" 
                        value={userId ?? ''} 
                        onChange={handleUserIdChange} /> 
                </Form.Group>
            </Form>
            <Row> 
                {posts && posts.length > 0 ? ( 
                    posts.map((post: any) => ( 
                    <Col key={post.id} sm={6} md={4} lg={3} className="mb-4">
                        <Card> 
                            <Card.Body> 
                                <Card.Title className="text-center h-4">
                                    {post.title}
                                </Card.Title> 
                                <Card.Text className="text-center"> 
                                    {post.body} 
                                </Card.Text> 
                                <div className="d-flex justify-content-center"> 
                                    <Button variant="primary" className="me-2" onClick={() => navigate(`/update-post/${post.id}`)}>
                                        Edit
                                    </Button> 
                                </div> 
                            </Card.Body> 
                        </Card> 
                    </Col> 
                    )) ) : ( 
                        <p className="text-center">No posts found.</p> 
                    )
                } 
            </Row>
        </Container>
    )
};

export default PostList;