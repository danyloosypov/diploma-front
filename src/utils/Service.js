import axios from 'axios';

export default class Service {
    static async func() {
        try {
            const response = await axios.get('http://192.168.0.105/api/')
            return response.data
        } catch (error) {
            console.log(error)
        }
        
    }

   

}