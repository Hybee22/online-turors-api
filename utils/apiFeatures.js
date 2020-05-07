class APIFeatures {
    constructor(query, queryString) {
      this.query = query;
      this.queryString = queryString;
    } 
    
    sort() {
      // 1. SORTING
      if (this.queryString.sort) {
        const sortBy = this.queryString.sort.split(',').join(' ');
        // sort('price ratingsAverage')
        this.query = this.query.sort(sortBy);
      } else {
        this.query = this.query.sort('-createdAt');
      }
  
      return this;
    }
  
  }
  
  module.exports = APIFeatures;
  