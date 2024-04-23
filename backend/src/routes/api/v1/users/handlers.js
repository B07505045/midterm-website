import { prisma } from "../../../../adapters";

/**
* @param {import('express').Request} req
* @param {import('express').Response} res
*/
export async function createOneUser(req, res) {
  // Check if the user is already exist in prisma db, if yes then return error
  const userExist = await prisma.user.findUnique({ where: { name: req.body.name } });
  if (userExist) return res.status(400).json({ error: "User already exist" });
    
  const user = await prisma.user.create({ 
    data: { 
        name: req.body.name, 
        password: req.body.password, 
        icon: req.body.icon
    }});
    return res.status(201).json(user);
}
    

export async function getAllUsers(req, res) {
const allUsers = await prisma.user.findMany({
    orderBy: [{id: 'desc',}],
});
return res.json(allUsers);
} 

/**
* @param {import('express').Request} req
* @param {import('express').Response} res
*/
export async function getOneUser(req, res) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });
    const user = await prisma.user.findUnique({ where: { id } });
    if (user === null) return res.status(404).json({ error: "Not Found" });
    return res.json(user);
    }
    
export async function getPost(req, res) {
    const allComments = await prisma.post.findMany({
        orderBy: [{id: 'desc',}],
    });
    return res.json(allComments);
}

export async function createOnePost(req, res) {
  const content = req.body.content;
  const authorName = req.body.name;
  if (!content) return res.status(400).json({ error: "Invalid content" });
  if (!authorName) return res.status(400).json({ error: "Invalid author" });

  const author = await prisma.user.findUnique({ where: { name: authorName } });
  if (author === null) return res.status(404).json({ error: "Invalid author" });

  const newPost = await prisma.user.update({
    where: { name: authorName },
    data: {
      posts: {
        create: {
          content: content,
          authorName: authorName,
          authorIcon: author.icon,
        },
      },
    },
  });

  const allPosts = await prisma.post.findMany();
  return res.json(allPosts);
}


export async function deleteOnePost(req, res) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });
  
    const post = await prisma.post.findUnique({ where: { id } });
    if (post === null) return res.status(404).json({ error: "Not Found" });
  
    // Check if the user is the author of the post
    // if (post.authorName !== req.session.username)
    //   return res.status(403).json({ error: "Forbidden" });
  
    const deletedPost = await prisma.post.delete({ where: { id } });
    const allPosts = await prisma.post.findMany();
    return res.json(allPosts);
  }

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function getLoginStatus(req, res) {
    const username = req.session.username;
    if (username) {
      return res.send("Hello " + username + "!");
    } else {
      return res.send("Please log in!");
    }
  }

export async function login(req, res) {
    const user = await prisma.user.findUnique({ where: { name: req.body.name } });
    if (user === null) return res.status(404).json({ error: "User does not exist" });
    if (user.password === req.body.password) {
      req.session.username = user.name;
      res.cookie("username", user.name);
      return res.status(201).json(user);
    } else {
      return res.status(404).json({ error: "Incorrect password" });
    }
  }
  
export async function logout(req, res) {
    req.session.destroy();
    res.clearCookie("username");
    return res.send("You are logged out!");
}

export const getAIImage = async (req, res) => {
  console.log(111)
  const { prompt } = req.body
  // Confirm data is valid
  if (!prompt) {
    return res.status(400).json({ message: 'Please fill in all fields' })
  }
  console.log('Prompt: ', prompt)
  const body = {
    prompt: `best quality, ultra high res, ultra high res, ${prompt}`,
    negative_prompt:
      'EasyNegative, lowres, normal quality, jpeg artifacts, ((NSFW))',
    seed: -1,
    cfg_scale: 8,
    sampler_index: 'DPM++ SDE Karras',
    steps: '30',
  }
  const response = await fetch(process.env.SD_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        'Basic ' + Buffer.from(process.env.SD_AUTH).toString('base64'),
    },
    body: JSON.stringify(body),
  }).catch((err) => {
    console.error(err)
    return res.status(500).json({ message: 'Something went wrong' })
  })
  const data = await response.json()
  // send base64 image to frontend
  res.status(200).json({ image: data.images[0] })
}