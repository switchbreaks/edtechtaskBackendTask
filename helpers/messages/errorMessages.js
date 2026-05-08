const errorMessages = {
    ERROR001: {
        code: "ERROR001",
        message: 'An error occurred while processing the request',
    },
    ERROR002: {
        code: "ERROR002",
        message: 'Name, email, and password are required',
    },
    ERROR003: {
        code: "ERROR003",
        message: 'Name must be at least 2 characters',  
    },
    ERROR004: {
        code: "ERROR004",
        message: 'Invalid email format',
    } ,  
    ERROR005:{
        code:"ERROR005",
        message:'Password must be at least 6 characters',
    },
    ERROR006:{
        code:"ERROR006",
        message:'Email already exists',
    },
    ERROR007:{
        code:"ERROR007",
        message:'User Not found',
    },
    ERROR008:{  
        code:"ERROR008",
        message:'Invalid email or password',
    },
    ERROR009:{
        code:"ERROR009",
        message:'Email And password are required',
    },
    ERROR010:{
        code:"ERROR010",
        message:'User Not Found',
    },
    ERROR011:{
        code:"ERROR011",
        message:'Invalid input type',
    },
    ERROR012:{
        code:"ERROR012",
        message:'Unauthorized Access',
    },
    ERR00013:{
        code:"ERR00013",
        message:'Invalid token',
    },
    ERR0014:{
        code:"ERR0014",
        message:'Token Not Provided',
    },
    ERR0015:{
        code:"ERR0015",
        message:'Task Not Found',
    },

};


module.exports = errorMessages;