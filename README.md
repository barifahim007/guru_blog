                # guru_blog powerd by graphql.....


    [x] Requiremnet...

    - user can post and publish blog app
    - user can see their post/profile
    - authentication system

    [x] Table

    - post
        - id
        - title
        - content
        - author_id
        - createdAt
        - updatedAt
        - published
    - user
        - id
        - name
        - email
        - password
        - createdAt
        - updatedAt
        - profile
    - user profile
        - id
        - bio
        - createdAt
        - updatedAt
        - user_id

                        # Technology Stack...


        - Graphql
        - TypeScript
        - Prisma
        - Postgress
        - Ts-node-dev
        - Nodemon

                    # GraphQL work on two basic things..
                    1. TypeDefs
                    2. Resolver

        # when we query somthing on resolver like
         resolver:(parent,args,context)=>{
            this shit take those 3 parameter ......
         }
