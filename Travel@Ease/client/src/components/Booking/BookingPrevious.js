import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Booking.css";
import {
  Form,
  FormGroup,
  ListGroup,
  ListGroupItem,
  Button,
  Input,
  Label,
} from "reactstrap";
export default function Booking({ tour, avgRating }) {
  const { price, reviews } = tour;
  const navigate = useNavigate();

  // Static testing later on for dynamic
  const [credentials, setCredentials] = useState({
    userId: "1",
    userEmail: "test@gmail.com",
    fullName: "",
    phone: "",
    guestSize: 1,
    bookDate: "",
  });

  const handleChange = (ev) => {
    setCredentials((prev) => ({ ...prev, [ev.target.id]: ev.target.value }));
  };

  const handleIncrement = () => {
    setCredentials((prev) => ({ ...prev, guestSize: prev.guestSize + 1 }));
  };

  const handleDecrement = () => {
    setCredentials((prev) => ({
      ...prev,
      guestSize: Math.max(1, prev.guestSize - 1),
    }));
  };

  //Stripe
  const handleClick = async (ev) => {
    ev.preventDefault();
    console.log(credentials);
    navigate("/payment");
  };

  const serviceFee = 25;
  const subTotal = Number(price) * Number(credentials.guestSize);
  const totalAmount =
    Number(price) * Number(credentials.guestSize) + Number(serviceFee);

  return (
    <div className="booking">
      <div className="booking_top d-flex align-items-center justify-content-between">
        <h3>
          ${price} <span>/per person</span>
        </h3>
        <span className="tour_rating d-flex align-items-center">
          <i className="bi bi-star-fill"></i>
          {avgRating === 0 ? null : avgRating} ({reviews?.length})
        </span>
      </div>

      {/* Booking Form */}
      <div className="booking_form">
        <h4>Contact Details</h4>
        {/* Booking Information */}
        <Form className="booking_info">
          <FormGroup>
            <Label htmlFor="">Full Name:</Label>
            <Input
              type="text"
              placeholder="Full Name"
              required
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="">Phone:</Label>
            <Input
              type="text"
              placeholder="Phone"
              required
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="">Email:</Label>
            <Input
              type="email"
              placeholder="Email"
              required
              onChange={handleChange}
            />
          </FormGroup>

          <div className="booking_form">
            <h4>Booking Summary</h4>
          </div>
          <FormGroup className="">
            <Label htmlFor="tour">Tour Date:</Label>
            <span> {tour.tourDate}</span>
            <br></br>
            <Label htmlFor="">Guests:</Label>
            <div className="d-flex align-items-center">
              <Button type="button" color="primary" onClick={handleDecrement}>
                -
              </Button>
              <Input
                type="text"
                value={credentials.guestSize}
                onChange={handleChange}
                min="1"
                max="10"
                required
                className="text-center"
              />
              <Button type="button" color="primary" onClick={handleIncrement}>
                +
              </Button>
            </div>
          </FormGroup>
        </Form>
      </div>
      {/* Booking Information */}

      {/* Booking Price */}
      <div className="booking_bottom">
        <ListGroup>
          <ListGroupItem className="border-0 px-0">
            <h5 className="d-flex align-items-center gap-1">
              ${price} <i class="bi bi-x-lg"></i> {credentials.guestSize}
              {credentials.guestSize > 1 ? "persons" : "person"}
            </h5>
            <span>$ {subTotal}</span>
          </ListGroupItem>

          <ListGroupItem className="border-0 px-0">
            <h5>Service Charge</h5>
            <span>${serviceFee}</span>
          </ListGroupItem>

          <ListGroupItem className="border-0 px-0">
            <h5>Total</h5>
            <span>${totalAmount}</span>
          </ListGroupItem>
        </ListGroup>

        <Button className="btn primary_btn w-100 mt-4" onClick={handleClick}>
          Book Now
        </Button>
      </div>
    </div>
  );
}
