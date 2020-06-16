import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Segment, Header, Button, Form } from "semantic-ui-react";
import ProductsForm from "./ProductForm";

export default function ProductView(props) {
  const [product, setProduct] = useState({});
  const [reviews, setReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [review, setReview] = useState("");

  function updateProduct(productObj) {
    setProduct(productObj);
  }

  useEffect(() => {
    Axios.get(`/api/products/${props.match.params.id}`)
      .then((res) => {
        console.log(res);
        setProduct(res.data.product);
        setReviews(res.data.reviews);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  async function handleSubmit() {
    console.log("submit");
    // POST	/api/products/:product_id/reviews
    const res = await Axios.post(`/api/products/${product.id}/reviews`, {
      description: review,
      username: "logged in User",
    });
    console.log(res);
    setReviews([res.data, ...reviews]);
    setReview("");
  }
  return (
    <div>
      <Segment>
        {showForm && <ProductsForm product={product} update={updateProduct} />}
        <Button onClick={() => setShowForm(!showForm)}>Toggle Form</Button>
        <Header as="h1">{product.name}</Header>
        <Header as="h3">{product.department}</Header>
        <Header as="h6">{product.price}</Header>
        {reviews.map((r) => {
          return (
            <div style={{ marginBottom: "10px" }}>
              <h1 style={{ margin: 0 }}>{r.username}</h1>
              <p>{r.description}</p>
            </div>
          );
        })}
        <br />
        <br />
        <Form onSubmit={handleSubmit}>
          <Form.Input
            placeholder={"enter review"}
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
          <Form.Button>add</Form.Button>
        </Form>
        <Button color="black" onClick={props.history.goBack}>
          Back
        </Button>
      </Segment>
    </div>
  );
}
