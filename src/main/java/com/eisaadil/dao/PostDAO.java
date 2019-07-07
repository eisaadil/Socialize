package com.eisaadil.dao;

import com.eisaadil.models.Post;

import java.util.List;

/**
 * Created by eisaadil on 03/08/17.
 */
public interface PostDAO {
    Post createPost(Post post);

    Post getPostFromId(long id);

    boolean deletePostFromId(long id);

    List<Post> getAllPosts();

    List<Post> getAllPostsForUserID(long id);

    //User updatePostFromId(long id, Post newPost);
}
