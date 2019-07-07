package com.eisaadil.mappers;

import com.eisaadil.models.Post;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * Created by eisaadil on 08/08/17.
 */
public class PostMapper implements RowMapper<Post> {
    @Override
    public Post mapRow(ResultSet rs, int i) throws SQLException {
        Post post = new Post();
        post.setId(rs.getLong("id"));
        post.setText(rs.getString("text"));
        post.setDate(rs.getLong("date"));
        post.setUserId(rs.getLong("userId"));
        return post;
    }
}
