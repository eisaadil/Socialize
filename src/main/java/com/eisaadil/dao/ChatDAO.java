package com.eisaadil.dao;

import com.eisaadil.models.Chat;

import java.util.List;

/**
 * Created by eisaadil on 10/08/17.
 */
public interface ChatDAO {
    Chat createChat(Chat chat);

    Chat getChatFromId(long id);

    List<Chat> getAllChatsBetweenTwoUsers(long fromUserId, long toUserId);

    Long getIdFromUsername(String username);

    //boolean deleteChatFromId(long id);
    //List<Chat> getAllPostsForUserID(long id);
}
