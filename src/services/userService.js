import instance from "./instance"

const userService = {
    login:async(userData)=>{
        try {
            const response = await instance.authInstance.post()
        } catch (error) {
            
        }

    }
}