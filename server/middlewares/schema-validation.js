async function validateSchema(schema,data){
    try {
        const {error} = schema.validate(data);
        if(error){
            const {details} = error;
            const message = details.map(item=>item.message).join(',');
            throw ({status:422, message});
        };
        return data;
    } catch (error) {
        throw error;
    }
};

module.exports = {validateSchema};