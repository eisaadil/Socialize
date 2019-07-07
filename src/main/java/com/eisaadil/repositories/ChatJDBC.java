package com.eisaadil.repositories;

import com.eisaadil.dao.ChatDAO;
import com.eisaadil.mappers.ChatMapper;
import com.eisaadil.models.Chat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ChatJDBC implements ChatDAO {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public Chat createChat(Chat chat) {
        int affectedRows = jdbcTemplate.update("INSERT INTO chats (text, date, fromUserId, toUserId) VALUES (?,?,?,?)",
                chat.getText(), System.currentTimeMillis() / 1000, chat.getFromUserId(), chat.getToUserId());
        if (affectedRows == 0) return null;

        long lastInsertedId = jdbcTemplate.queryForObject("SELECT currval(pg_get_serial_sequence('chats', 'id'))", Long.class);
        return getChatFromId(lastInsertedId);
    }

    @Override
    public Chat getChatFromId(long id) {
        try {
            return jdbcTemplate.queryForObject("SELECT * FROM chats where id = ?", new Object[]{id}, new ChatMapper());
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    @Override
    public List<Chat> getAllChatsBetweenTwoUsers(long fromUserId, long toUserId) {
        try {
            return jdbcTemplate.query("SELECT * FROM chats WHERE (fromUserId = ? AND toUserId = ?) OR (fromUserId = ? AND toUserId = ?) ORDER BY date desc", new Object[]{fromUserId, toUserId, toUserId, fromUserId}, new ChatMapper());
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    @Override
    public Long getIdFromUsername(String username) {
        try {
            return jdbcTemplate.queryForObject("SELECT id FROM users WHERE username = ?", new Object[]{username}, Long.class);
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }
}
