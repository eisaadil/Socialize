package com.eisaadil.services;

import com.eisaadil.Helpers;
import com.eisaadil.models.Post;
import com.eisaadil.repositories.PostJDBC;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {

    @Autowired
    private PostJDBC postJdbcTemplate;

    public String createPost(Post post) {
        /*
            Response:
                1: Post successful -- status, data
                0: Post failed -- status
         */
        Post newPost = postJdbcTemplate.createPost(post);
        return Helpers.getDataInJSONHelperReturnsData(newPost);
    }

    public String deletePostFromId(long id) {
        /*
            Response:
                1: User successfully deleted -- status
                0: User could not be deleted -- status
         */
        return Helpers.getDataInJSONHelperReturnsBoolean(postJdbcTemplate.deletePostFromId(id));
    }

    public String getPostFromId(long id) {
        /*
            Response:
                1: Got user -- status, data
                0: Failed to get user -- status
         */
        Post post = postJdbcTemplate.getPostFromId(id);
        return Helpers.getDataInJSONHelperReturnsData(post);
    }

    public String getAllPosts() {
        List<Post> allPosts = postJdbcTemplate.getAllPosts();
        return Helpers.getDataInJSONHelperReturnsData(allPosts);
    }

    public String getAllPostsForUserId(long id) {
        List<Post> allPostsForUserID = postJdbcTemplate.getAllPostsForUserID(id);
        return Helpers.getDataInJSONHelperReturnsData(allPostsForUserID);
    }
}
