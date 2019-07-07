package com.eisaadil.controllers;

import com.eisaadil.models.Post;
import com.eisaadil.services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/post")
@CrossOrigin(origins = "http://localhost:4200")
public class PostController {

    @Autowired
    private PostService postService;

    @RequestMapping(value = "/createPost", method = RequestMethod.POST)
    public String createPost(@RequestBody Post post) {
        return postService.createPost(post);
    }

    @RequestMapping(value = "/deletePostFromId", method = RequestMethod.POST)
    public String deletePostFromId(@RequestParam long id) {
        return postService.deletePostFromId(id);
    }

    @RequestMapping(value = "/getPostFromId", method = RequestMethod.POST)
    public String getPostFromId(@RequestParam long id) {
        return postService.getPostFromId(id);
    }

    @RequestMapping(value = "/getAllPosts", method = RequestMethod.POST)
    public String getAllPosts() {
        return postService.getAllPosts();
    }

    @RequestMapping(value = "/getAllPostsForUserId", method = RequestMethod.POST)
    public String getAllPostsForUserId(@RequestParam long id) {
        return postService.getAllPostsForUserId(id);
    }
}
