function Config(){
    switch(process.env.NODE_ENV){
        case 'development':
            return {
             	server: 'http://127.0.0.1:5000'
            };

        case 'production':
            return {
            	server: ''
            };

        default:
            return {};
    }
};

export default Config;
