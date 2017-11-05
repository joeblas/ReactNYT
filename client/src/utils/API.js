import axios from "axios";

const apiKey = "88f3ac516e674ae08e86616cfde941e7";

const helpers = {
    runQuery: (searchTerm) => {
        const url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" 
        + apiKey 
        + "&q=" 
        + searchTerm;

        return axios
            .get(url)
            .then((response) => {

                if (response.data.response.docs[0]) {
                    return response.data.response.docs;
                } else {
                    return " ";
                }
            });
    },

    getSavedArticles: () => {
        return axios.get('/api/saved');
    },

    saveArticle: (articleTitle, articleDate, articleURL) => {

        console.log(`Article Title: ${articleTitle}`);
        console.log(`Article Date: ${articleDate}`);

        return axios.post('/api/saved', {
            title: articleTitle,
            date: articleDate,
            url: articleURL
        });

    },

    removeArticle: (articleID) => {
        console.log(`Delete article with ID of ${articleID}`);

        return axios
            .delete(`/api/saved/${articleID}`)
            .then(res => console.log(`Delete confirmation: ${res}`))
            .catch(err => console.log(`There was an error: ${err}`))

    }

};

export default helpers;