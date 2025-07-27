import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import  fs  from "node:fs/promises"
import { title } from "node:process";
import { mime } from "zod/v4";
import { CreateMessageResultSchema } from "@modelcontextprotocol/sdk/types.js";

const server = new McpServer({
    name:"test",
    version:"1.0.0",
    capabitlity:{
        resources:{},
        tools:{},
        prompts:{}
    },
})

server.tool("create-user","Create a new user in the database",{
    name:z.string(),
    email:z.string(),
    address:z.string(),
    phone:z.string()
},{
    title:"Create User",
    readOnlyHint : false,
    destructiveHint:false,
    idempotentHint:false,
    openWorldHint:true
},async (params) =>{
    try{
        const id = await createUser(params)

        return{
            content:[ {type:"text",text:`User ${id} created successfully.` }]
        }


    }catch (ex) {

        return{
            content:[ {type:"text",text:`${ex} Failed to save User.` }]
        }

    }
})


server.tool("create-random-user","Create a random user with fake data",{
    title:"Create Random User",
    readOnlyHint : false,
    destructiveHint:false,
    idempotentHint:false,
    openWorldHint:true
    },async () =>{
        const res = await server.server.request({
            method:"sampling/createMessage",
            params:{
                messages:[
                    {
                        role:"user",
                        content:{
                            type:"text",
                            text:"Generate a random user profile with a realistic name, email, address and phone number.return this data as a JSON object with no other text or formatter so it can be used with JSON.parse"
                        }
                    }
                ],
                maxTokens:1024,
            }
        },CreateMessageResultSchema)

        if(res.content.type !== "text"){
            return {
                content:[ {type:"text",text:"Failed to generate random user data." }]
            }

        }


        try{
            const fakeUser = JSON.parse(res.content.text.trim().replace(/^```json/,"").replace(/```$/,"").trim())
        
            const id = await createUser(fakeUser)
        
            return {
                content:[ {type:"text",text:`Random user created with ID ${id}.`} ]
            }

        }catch{
             return {
                content:[ {type:"text",text:"Failed to generate user data." }]
            }
        }


})

server.resource("users",
    "users://all",
{
    description:"All users in the database",
    title:"Users",
    mimeType:"application/json",
},async uri =>{
    const users = await import("../../../Projects/MCP Server and Client/src/data/users.json",{
        with : { type:"json" }
    }).then(m=>m.default)

    return {
        contents :[
            {
                uri:uri.href,
                mimeType:"application/json",
                text:JSON.stringify(users),
            }
        ]
    }
})

server.resource("user-details",new ResourceTemplate("users://{userId}/profile",{ list:undefined}),
{
    description:"Details of a specific user",
    title:"User Details",
    mimeType:"application/json",
},async (uri,{userId}) =>{
    const users = await import("../../../Projects/MCP Server and Client/src/data/users.json",{
        with : { type:"json" }
    }).then(m=>m.default)

    const user = users.find(u=>u.id === parseInt(userId as string))

    if(user == null){
        return {
            contents :[
                {
                    uri:uri.href,
                    mimeType:"application/json",
                    text:JSON.stringify({error:"User not found"}),
                }
            ]
        }
    }


    return {
        contents :[
            {
                uri:uri.href,
                mimeType:"application/json",
                text:JSON.stringify(user),
            }
        ]
    }

}
)

server.prompt(
    "generate-fake-user",
    "Generate a fake user profile",
    {
        name: z.string().describe("Name of the user"),
    },
    ({name}) =>{
        return {
            messages:[
                {
                    role:"user",
                    content:{
                        type:"text",
                        text:`Generate a fake user profile for ${name}.The user should have a realistic email, address and phone number`
                    }
                }
            ]
        }
    }
)


async function createUser(user: {
    name:string,
    email:string,
    address:string,
    phone:string
}) {
    
    const users = await import("../../../Projects/MCP Server and Client/src/data/users.json",{
        with : { type:"json" }
    }).then(m=>m.default)

    const id = users.length + 1;

    users.push({id,...user});

    await fs.writeFile("../../../Projects/MCP Server and Client/src/data/users.json",JSON.stringify(users,null,2))

    return id;
}

async function main() {
    const transport = new StdioServerTransport()
    await server.connect(transport)
}


main()

