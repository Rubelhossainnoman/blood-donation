class Stroage{
    // Send data in localStroage here...
    static sendDataLs (key , data){
        localStorage.setItem(key, JSON.stringify(data))
    }

    // Get data form localStroage here....
    static getDataLs (key){
        // Use contion here...
        if (localStorage.getItem(key)) {
            return JSON.parse(localStorage.getItem(key));
        } else {
            return [];
        }
    }

}