const apiKey = "oCbCfQ4uYShvyjLYi0GyhHjnNOhJTdO9GWKKHmnSUWp8qWf97Wvf3dq0Woz9Yn5Pi4a263dWCHW185hZ8KojXNW6LuWNW1UvsUTJcuW4ME4iK0GSnc_ok-PmFKxaYHYx"

const Yelp = {
    search(term,location,sortBy){
        return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}&limit=50`, {
            headers: {
                Authorization: `Bearer ${apiKey}`
            }
        }).then(response=>{
            return response.json()
        }).then(jsonResponse=>{
            if(jsonResponse.businesses){
                return jsonResponse.businesses.map(business=>{
                        console.log(business)
                        return {
                            id: business.id,
                            alias: business.alias,
                            image_url: business.image_url,
                            categories: business.categories,
                            coordinates: business.coordinates,
                            display_phone: business.display_phone,
                            distance: business.distance,
                            is_closed: business.is_closed,
                            location: business.location,
                            name: business.name,
                            phone: business.phone,
                            price: business.price,
                            rating: business.rating,
                            review_count: business.review_count,
                            url: business.url
                        }
                })
            }
        })
        
    },
    searchGeo(term, latitude, longitude, sortBy){
        try {
            return fetch(`https://corsanywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&latitude=${latitude}&longitude=${longitude}&sort_by=${sortBy}&limit=50`,{
                headers: {
                    Authorization: `Bearer ${apiKey}`
                }
            }).then(response=>{
                return response.json()
            }).then(jsonResponse=>{
                if(jsonResponse.businesses){
                    return jsonResponse.businesses.map(business=>{
                        return {
                            id: business.id,
                            alias: business.alias,
                            image_url: business.image_url,
                            categories: business.categories,
                            coordinates: business.coordinates,
                            display_phone: business.display_phone,
                            distance: business.distance,
                            is_closed: business.is_closed,
                            location: business.location,
                            name: business.name,
                            phone: business.phone,
                            price: business.price,
                            rating: business.rating,
                            review_count: business.review_count,
                            url: business.url
                        }
                    })
                }
            })
        } catch(error){
            console.log(error)
        }
    },
    
    getReviews(id){
        return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/${id}/reviews`,{
            headers: {
                Authorization: `Bearer ${apiKey}`
            }
        }).then(response=>{
            return response.json()
        }).then(jsonResponse=>{
            if(jsonResponse.reviews){
                return jsonResponse.reviews.map(review=>{
                    console.log(review)
                    return {
                        id: review.id,
                        rating: review.rating,
                        user: {
                            id: review.user.id,
                            image_url: review.user.image_url
                        },
                        text: review.text,
                        time_created: review.time_created,
                    }
                })
            }
        })
    }
}

export default Yelp