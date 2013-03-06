var API_URL = "http://api.elophant.com/v2/";
var ELOPHANT_API_KEY = "";
var REGION = "na"


//TODO: Move this someplace where it makes more sense

var appendApiKey = function(url) {
    return url + "?key=" + ELOPHANT_API_KEY;
}

/*
    For items/champions

    resource refers to:
    http://api.elophant.com/v2/<resource>?key=<key>
 */
exports.getStaticResourceUrl = function(resource) {
    return appendApiKey(API_URL +  resource);
};

/*
    For summoner

    resource refers to:
    http://api.elophant.com/v2/<region>/summoner/<summoner_name>
 */
exports.getSummonerUrl = function(name) {
    return appendApiKey(API_URL + REGION + "/summoner/" + name);
};
