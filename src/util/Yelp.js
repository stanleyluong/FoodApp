const apiKey = "7R8guCX9uPFAVZ5J4nrHFt8c402C8uWMCIZnyD2MEUKl6tI5nHFGHObPB26_kp3DfmRItpDo2fVyH9uOLX7v9PdKuDsQF9IKufojEO1Wj68hxrcwwIxfXGYrwh2KX3Yx"

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
        return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&latitude=${latitude}&longitude=${longitude}&sort_by=${sortBy}&limit=50`,{
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
    }
}

export default Yelp