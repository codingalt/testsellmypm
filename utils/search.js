class SearchListing{
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    search(){
        const keyword = this.queryStr.keyword ? {
            "details.location.country": {
                $regex: this.queryStr.keyword,
                $options: "i",
            },
        } : {};

        this.query = this.query.find({...keyword})
        return this;
    }

    searchByTitle(){
        const keyword = this.queryStr.keyword ? {
            "details.title": {
                $regex: this.queryStr.keyword,
                $options: "i",
            },
        } : {};
        this.query = this.query.find({...keyword})
        return this;
    }

    searchAdvisors(){
        const keyword = this.queryStr.keyword ? {
            "name": {
                $regex: this.queryStr.keyword,
                $options: "i",
            },
        } : {};
        this.query = this.query.find({...keyword})
        return this;
    }
};

module.exports = SearchListing