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
-POST /request/review/:status/:requestuserId

UserRouter
-GET /user/requests/received
-GET /user/connections
-GET /user/feed -Gets you the profiles of other users on platform

Status: ignore,intrested,accepted,rejected
Pagination

/feed?page=1&limit=10 =>1-10 =>.skip(0) &.limit(10)

/feed?page=2&limit=10 =>1-10 =>.skip(10) &.limit(10)

/feed?page=3&limit=10 =>1-10 =>.skip(20) &.limit(10)

/feed?page=4&limit=10 =>1-10 =>.skip(20) &.limit(10)

skip=(page-1)*limit;


