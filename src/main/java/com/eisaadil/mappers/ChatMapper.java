package com.eisaadil.mappers;

import com.eisaadil.models.Chat;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * Created by eisaadil on 10/08/17.
 */
public class ChatMapper implements RowMapper<Chat> {
    @Override
    public Chat mapRow(ResultSet rs, int i) throws SQLException {
        Chat chat = new Chat();
        chat.setId(rs.getLong("id"));
        chat.setText(rs.getString("text"));
        chat.setDate(rs.getLong("date"));
        chat.setFromUserId(rs.getLong("fromUserId"));
        chat.setToUserId(rs.getLong("toUserId"));
        return chat;
    }
}
