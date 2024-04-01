
const CookiesSession = async (response, token, message, res) => {

    const options = new Object({
        expire : new Date(Date.now() * 10 * 60 * 60 * 1000), 
        domain : 'localhost', 
        path : '/', 
        HttpOnly : true, 
        secure : true 
    });
    
    res.cookie('Token', token, options);
    return res.status(200).json({ status : 201, response, message });    
};

export default CookiesSession;