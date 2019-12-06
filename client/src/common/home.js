import React from 'react'
import {Carousel} from 'react-bootstrap'
import image1 from '../images/task.png'
import image2 from '../images/task22.jpeg'
import image3 from '../images/task33.png'
export default function Home(props) {
    return (
        <div><br/><br/>
                <div className="text-center">
                <Carousel>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={image1} width="80%" height="300px"
      alt="First slide"
    />
    <Carousel.Caption>
      <h3>First slide label</h3>
      
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={image2}  width="80%" height="300px"
      alt="Third slide"
    />

    <Carousel.Caption>
      <h3>Second slide label</h3>
      
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={image3} width="80%" height="300px"
      alt="Third slide"
    />

    <Carousel.Caption>
      <h3>Third slide label</h3>
      
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
        </div>
        </div>
        
    )
}