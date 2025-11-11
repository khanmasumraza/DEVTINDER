// DevTinder Api Lists

authRouter
-POST /signup
-POST /login
-POST /logout

profileRouter
-GET /profile/view
-PATCH /profile/edit
-PATCH /profile/password

connectionRequestRouter

-POST /request/send/:status/:userId
-POST /request/review/:status/:userId

UserRouter
-GET /user/connections
-GET /user/request
-GET /user/feed -Gets you the profiles of other users on platform

Status: ignore,intrested,accepted,rejected

