hosted at https://plannerapp-api.herokuapp.com

/api/auth/register

input: request body:  {"username": "...", "email": "...", "password": "..."}

return: {"success": true or false, "token": "...."}

/api/auth/login

input: request body:  {"email": "...", "password": "..."}

return: {"success": true or false, "token": "...."}

/api/auth/forgotpassword

input: request body: {"email": "..."}

return: { success: true or false, data: "Email Sent or not Sent"}

/api/auth/resetpassword/:resetToken

input: request body: {"password": "..."}

return: { success: true or false, data: "some msg"}

/api/private/courses/all

input: None

output: {
            success: true,
            msg: "Retrieved Courses!",
            courses: results
        }

/api/private/courses/page/:coursesPerPage/:pageNum

input: None 

output: {
            success: true,
            msg: "Retrieved Courses!",
            profiles: results
        }

/api/private/courses/getDetail/:courseId

input: None

output: {
            success: true,
            msg: "Got Course!",
            course: results
        }

/api/private/courses/getPrereq/:courseId

input: None

output: {
            success: true,
            msg: "Got Course!",
            prereqs: results
        }

/api/private/courses/getNextCourses/:courseId

input: None

output: {
            success: true,
            msg: "Got Course!",
            prereqs: results
        }

/api/private/courses/searchCourse/:searchString

output: {
            success: true,
            msg: "Got Course!",
            prereqs: results
        }

/api/private/courses/recommendCourses/:numCourses

input: None

output: {
            success: true,
            msg: "Got Courses!",
            course: results
        }

