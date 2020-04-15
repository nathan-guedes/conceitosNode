const express = require("express");
const {uuid} = require('uuidv4');
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.status(200).json(repositories);
});

app.post("/repositories", (request, response) => {
  const {title, url,techs} = request.body;
  const repo = {id:uuid(),title,url,techs,likes:0};
  repositories.push(repo);
  return response.json(repo);
 
});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const {title,url,techs} =request.body;
  const repoIndex = repositories.findIndex(repo=>repo.id===id);
  if(repoIndex<0){
    return response.status(400).json({error: 'bad Id'});
  }
  const {likes}= repositories[repoIndex];
  
  
  const newRepo = {id,title,url,techs,likes};

  repositories[repoIndex] = newRepo;

  return response.status(200).json(newRepo);


});

app.delete("/repositories/:id", (request, response) => {
  const {id } = request.params;
  const repoIndex = repositories.findIndex(repo=>repo.id===id);
  if(repoIndex<0){
    return response.status(400).json({error: 'bad Id'});
  }
  repositories.splice(repoIndex,1);
  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;
  const repoIndex = repositories.findIndex(repo=>repo.id===id);
  if(repoIndex<0){
    return response.status(400).json({error: 'bad Id'});
  }
  const {title,url,techs,likes}= repositories[repoIndex];
  // const oldRepo= repositories[repoIndex];
  
  const newRepo = {id,title,url,techs,likes:likes+1};
  repositories[repoIndex] = newRepo;

  response.json(newRepo);
});

module.exports = app;
