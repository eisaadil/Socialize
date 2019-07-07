package com.eisaadil.repositories;

import com.eisaadil.dao.PostDAO;
import com.eisaadil.mappers.PostMapper;
import com.eisaadil.models.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by eisaadil on 08/08/17.
 */
@Repository
public class PostJDBC implements PostDAO {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public Post createPost(Post post) {
        int affectedRows = jdbcTemplate.update("INSERT INTO posts (text, date, userId) VALUES (?,?,?)",
                post.getText(), System.currentTimeMillis() / 1000, post.getUserId());
        if (affectedRows == 0) return null;

        long lastInsertedId = jdbcTemplate.queryForObject("SELECT currval(pg_get_serial_sequence('posts', 'id'))", Long.class);
        return getPostFromId(lastInsertedId);
    }

    @Override
    public Post getPostFromId(long id) {
        try {
            return jdbcTemplate.queryForObject("SELECT * FROM posts where id = ?", new Object[]{id}, new PostMapper());
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    @Override
    public boolean deletePostFromId(long id) {
        int affectedRows = jdbcTemplate.update("DELETE from posts WHERE id = ?", id);
        return !(affectedRows == 0);
    }

    @Override
    public List<Post> getAllPosts() {
        try {
            return jdbcTemplate.query("SELECT * FROM posts ORDER BY date desc", new PostMapper());
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    @Override
    public List<Post> getAllPostsForUserID(long userId) {
        try {
            return jdbcTemplate.query("SELECT * FROM posts WHERE userId = ? ORDER BY date desc", new Object[]{userId}, new PostMapper());
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }
}
