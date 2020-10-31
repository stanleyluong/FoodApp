import React from 'react'
import Yelp from '../../util/Yelp'
import Review from '../Review/Review'

class Reviews extends React.Component {
    constructor(props){
        super(props)
        this.state={
            reviews:[]
        }
    }
    componentDidMount(){
        console.log(this.props.id,'reviews line 13')
        Yelp.getReviews(this.props.id).then(reviews=>{
            this.setState({
                reviews: reviews
            })
        })
    }
    render(){
        return (
            <div className="Reviews" id="Reviews">
                {this.state.reviews.map(review=>{
                    return <Review key={review.id} review={review}/>
                })
                }
        </div> 
        )
    }
}

export default Reviews